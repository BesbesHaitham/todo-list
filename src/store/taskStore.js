import { fallbackTasks, tasksApi } from '../services/tasksApi';
import { STORAGE_KEY, taskReducer, validTasks } from './taskModel';
import { translateSampleTasks } from './taskMigration';

// localStorage owns user data. Mock acknowledgements never replace it.
const browserStorage = {
  getItem: (key) => globalThis.localStorage.getItem(key),
  setItem: (key, value) => globalThis.localStorage.setItem(key, value),
};

export function createTaskStore({
  api = tasksApi,
  storage = browserStorage,
  seed = fallbackTasks,
} = {}) {
  let state = { tasks: [], loaded: false, storageError: false };
  let initialization;
  let queue = Promise.resolve();
  const listeners = new Set();
  const publish = (changes) => {
    state = { ...state, ...changes };
    listeners.forEach((listener) => listener());
  };
  const persist = (tasks) => {
    try {
      storage.setItem(STORAGE_KEY, JSON.stringify({ version: 1, tasks }));
      return false;
    } catch {
      return true;
    }
  };
  const acknowledge = (operation) => {
    // Serialize requests to preserve mutation order; never replay against static stubs.
    queue = queue.then(operation).catch(() => {
      // Local changes remain saved when the mock server is unavailable.
    });
  };
  return {
    getSnapshot: () => state,
    subscribe(listener) {
      listeners.add(listener);
      return () => listeners.delete(listener);
    },
    initialize() {
      if (initialization) return initialization;
      initialization = (async () => {
        let saved;
        let storageError = false;
        try {
          const raw = storage.getItem(STORAGE_KEY);
          if (raw !== null) {
            const data = JSON.parse(raw);
            if (data.version !== 1 || !validTasks(data.tasks))
              throw new Error('Les données enregistrées sont invalides.');
            saved = translateSampleTasks(data.tasks);
            if (saved.some((task, index) => task !== data.tasks[index])) {
              storageError = persist(saved);
            }
          }
        } catch {
          storageError = true;
        }
        // Render local data immediately, without waiting for the network.
        if (saved !== undefined) publish({ tasks: saved, loaded: true, storageError });
        let initial = seed;
        try {
          initial = translateSampleTasks(await api.list());
        } catch {
          /* Offline first-run seed. */
        }
        if (saved === undefined)
          publish({ tasks: initial, loaded: true, storageError: persist(initial) || storageError });
      })();
      return initialization;
    },
    dispatch(action) {
      if (!state.loaded) return;
      const next = taskReducer(state.tasks, action);
      if (next === state.tasks) return;
      publish({ tasks: next, storageError: persist(next) });
      if (action.type === 'create') acknowledge(() => api.create(action.task));
      if (action.type === 'update') acknowledge(() => api.update(action.id, action.changes));
      if (action.type === 'delete') acknowledge(() => api.remove(action.id));
      if (action.type === 'move') {
        const task = next.find((item) => item.id === action.id);
        acknowledge(() =>
          api.update(task.id, {
            status: task.status,
            order: next.filter((item) => item.status === task.status).map((item) => item.id),
          })
        );
      }
    },
  };
}

export const taskStore = createTaskStore();
