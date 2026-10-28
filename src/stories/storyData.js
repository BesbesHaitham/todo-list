import { fn } from 'storybook/test';
import tasks from '../../wiremock/__files/tasks.json';

export const sampleTasks = tasks;
export const sampleTask = tasks[0];
export const createTaskActions = () => ({
  onAdd: fn(),
  onEdit: fn(),
  onDelete: fn(),
  onComplete: fn(),
});
