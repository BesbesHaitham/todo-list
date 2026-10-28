import { useArgs } from 'storybook/preview-api';
import { fn } from 'storybook/test';
import TaskBoard from '../components/organisms/TaskBoard';
import { taskReducer } from '../store/taskModel';
import { createTaskActions, sampleTasks } from './storyData';

export default {
  title: 'Organisms/TaskBoard',
  component: TaskBoard,
  parameters: { frame: 'board', layout: 'fullscreen' },
  args: {
    tasks: sampleTasks,
    allTasks: sampleTasks,
    filtered: false,
    onMove: fn(),
    ...createTaskActions(),
  },
  render: function Render(args) {
    const [, updateArgs] = useArgs();
    const update = (action) => {
      const next = taskReducer(args.allTasks, action);
      const visibleIds = new Set(args.tasks.map((task) => task.id));
      updateArgs({
        allTasks: next,
        tasks: args.filtered ? next.filter((task) => visibleIds.has(task.id)) : next,
      });
    };
    return (
      <TaskBoard
        {...args}
        onMove={(id, status, overId) => {
          args.onMove(id, status, overId);
          update({ type: 'move', id, status, overId });
        }}
        onComplete={(task) => {
          args.onComplete(task);
          update({
            type: 'update',
            id: task.id,
            changes: { status: task.status === 'done' ? 'todo' : 'done' },
          });
        }}
        onDelete={(task) => {
          args.onDelete(task);
          update({ type: 'delete', id: task.id });
        }}
      />
    );
  },
};

export const Interactive = {};
export const Empty = { args: { tasks: [], allTasks: [] } };
export const Filtered = {
  args: { tasks: sampleTasks.filter((task) => task.priority === 'high'), filtered: true },
};
