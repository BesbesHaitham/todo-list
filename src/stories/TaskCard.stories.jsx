import { useArgs } from 'storybook/preview-api';
import TaskCard from '../components/molecules/TaskCard';
import { createTaskActions, sampleTask } from './storyData';

export default {
  title: 'Molecules/TaskCard',
  component: TaskCard,
  parameters: { frame: 'card' },
  args: { task: sampleTask, ...createTaskActions() },
  render: function Render(args) {
    const [, updateArgs] = useArgs();
    return (
      <TaskCard
        {...args}
        onComplete={(task) => {
          args.onComplete(task);
          updateArgs({ task: { ...task, status: task.status === 'done' ? 'todo' : 'done' } });
        }}
      />
    );
  },
};

export const ToDo = {};
export const InProgress = {
  args: { task: { ...sampleTask, status: 'progress', priority: 'medium' } },
};
export const Completed = { args: { task: { ...sampleTask, status: 'done', priority: 'low' } } };
export const NoDueDate = { args: { task: { ...sampleTask, dueDate: '' } } };
export const LongContent = {
  args: {
    task: {
      ...sampleTask,
      title: 'Review the component library and document the next iteration of the workspace',
      description:
        'A longer description that demonstrates wrapping and truncation while preserving the full task details for editing.',
    },
  },
};
