import { useEffect, useSyncExternalStore } from 'react';
import { taskStore } from './taskStore';

export function useTasks() {
  const state = useSyncExternalStore(taskStore.subscribe, taskStore.getSnapshot);
  useEffect(() => {
    taskStore.initialize();
  }, []);
  return { ...state, dispatch: taskStore.dispatch };
}
