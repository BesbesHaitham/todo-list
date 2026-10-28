import frenchTasks from '../../wiremock/__files/tasks.json';

// Only migrate unchanged built-in sample text; never translate users' own content.
const originalText = {
  'task-ui': ['Design the UI', 'Create a clean and modern interface'],
  'task-theme': ['Add dark mode', 'Implement light and dark theme'],
  'task-docs': ['Write documentation', 'Add README and usage guide'],
  'task-drag': ['Implement drag and drop', 'Allow moving tasks between columns'],
  'task-api': ['Connect to WireMock', 'Use mock API for tasks'],
  'task-init': ['Initialize React project', 'Set up Vite and project structure'],
  'task-deps': ['Install dependencies', 'Add required packages'],
  'task-atoms': ['Create base components', 'Button, Input, Card'],
};

export function translateSampleTasks(tasks) {
  return tasks.map((task) => {
    const original = originalText[task.id];
    const translated = frenchTasks.find((sample) => sample.id === task.id);
    if (!original || !translated) return task;
    const title = task.title === original[0] ? translated.title : task.title;
    const description =
      task.description === original[1] ? translated.description : task.description;
    return title === task.title && description === task.description
      ? task
      : { ...task, title, description };
  });
}
