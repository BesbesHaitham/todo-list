import seedTasks from '../../wiremock/__files/tasks.json';
import { validTasks } from '../store/taskModel';

const baseUrl = (import.meta.env.VITE_API_BASE_URL || '/api').replace(/\/$/, '');

async function request(path, options = {}) {
  const response = await fetch(`${baseUrl}${path}`, {
    ...options,
    headers: { 'Content-Type': 'application/json', ...options.headers },
    signal: AbortSignal.timeout(1800),
  });
  if (!response.ok) throw new Error(`Mock API returned ${response.status}`);
  return response.status === 204 ? null : response.json();
}

export const tasksApi = {
  async list() {
    const tasks = await request('/tasks');
    if (!validTasks(tasks)) throw new Error('Invalid initial task data');
    return tasks;
  },
  create: (task) => request('/tasks', { method: 'POST', body: JSON.stringify(task) }),
  update: (id, changes) =>
    request(`/tasks/${encodeURIComponent(id)}`, { method: 'PATCH', body: JSON.stringify(changes) }),
  remove: (id) => request(`/tasks/${encodeURIComponent(id)}`, { method: 'DELETE' }),
};

export const fallbackTasks = seedTasks;
