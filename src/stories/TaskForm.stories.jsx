import { fn } from 'storybook/test';
import TaskForm from '../components/molecules/TaskForm';
import { sampleTask } from './storyData';

export default {
  title: 'Molecules/TaskForm',
  component: TaskForm,
  parameters: { frame: 'form' },
  args: { initialStatus: 'todo', onSubmit: fn(), onCancel: fn() },
  argTypes: { initialStatus: { control: 'select', options: ['todo', 'progress', 'done'] } },
  render: (args) => <TaskForm key={JSON.stringify([args.task, args.initialStatus])} {...args} />,
};

export const Create = {};
export const Edit = { args: { task: sampleTask } };
export const InProgress = { args: { initialStatus: 'progress' } };
