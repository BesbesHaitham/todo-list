export const COLUMNS = [
  { id: 'todo', label: 'To Do', variant: 'neutral', description: 'Ready when you are' },
  { id: 'progress', label: 'In Progress', variant: 'warning', description: 'Making things happen' },
  { id: 'done', label: 'Done', variant: 'success', description: 'A little win, every time' },
];
export const PRIORITIES = ['high', 'medium', 'low'];
export const STORAGE_KEY = 'focus-tasks:v1';

export function validDate(value) {
  if (value === '') return true;
  return (
    typeof value === 'string' &&
    /^\d{4}-\d{2}-\d{2}$/.test(value) &&
    Number.isFinite(Date.parse(value)) &&
    new Date(value).toISOString().slice(0, 10) === value
  );
}

export function validTask(task) {
  return (
    task &&
    typeof task.id === 'string' &&
    task.id.length > 0 &&
    !COLUMNS.some((column) => column.id === task.id) &&
    typeof task.title === 'string' &&
    task.title.trim().length > 0 &&
    task.title.length <= 120 &&
    typeof task.description === 'string' &&
    task.description.length <= 2000 &&
    PRIORITIES.includes(task.priority) &&
    COLUMNS.some((column) => column.id === task.status) &&
    validDate(task.dueDate)
  );
}

export function validTasks(tasks) {
  return (
    Array.isArray(tasks) &&
    tasks.every(validTask) &&
    new Set(tasks.map((task) => task.id)).size === tasks.length
  );
}

export function taskReducer(tasks, action) {
  switch (action.type) {
    case 'create':
      return validTask(action.task) && !tasks.some((task) => task.id === action.task.id)
        ? [...tasks, action.task]
        : tasks;
    case 'update':
      return tasks.map((task) => {
        if (task.id !== action.id) return task;
        const updated = { ...task, ...action.changes, id: task.id };
        return validTask(updated) ? updated : task;
      });
    case 'delete':
      return tasks.filter((task) => task.id !== action.id);
    case 'move': {
      const from = tasks.findIndex((task) => task.id === action.id);
      if (from < 0 || !COLUMNS.some((column) => column.id === action.status)) return tasks;
      if (action.id === action.overId) return tasks;
      const target = tasks.findIndex((task) => task.id === action.overId);
      const next = [...tasks];
      const [task] = next.splice(from, 1);
      const moved = { ...task, status: action.status };
      if (target >= 0) {
        const insertAt =
          task.status === action.status
            ? target
            : next.findIndex((item) => item.id === action.overId);
        next.splice(insertAt, 0, moved);
      } else {
        const last = next.findLastIndex((item) => item.status === action.status);
        next.splice(last < 0 ? next.length : last + 1, 0, moved);
      }
      return next;
    }
    default:
      return tasks;
  }
}

export function filterTasks(
  tasks,
  { search = '', priority = 'all', due = 'all' },
  today = new Date()
) {
  const query = search.trim().toLowerCase();
  const localToday = `${today.getFullYear()}-${String(today.getMonth() + 1).padStart(2, '0')}-${String(today.getDate()).padStart(2, '0')}`;
  return tasks.filter(
    (task) =>
      (!query || `${task.title} ${task.description}`.toLowerCase().includes(query)) &&
      (priority === 'all' || task.priority === priority) &&
      (due === 'all' ||
        (task.status !== 'done' &&
          task.dueDate &&
          (due === 'today' ? task.dueDate === localToday : task.dueDate < localToday)))
  );
}
