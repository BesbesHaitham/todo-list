import { DndContext } from '@dnd-kit/core';
import TaskColumn from '../components/organisms/TaskColumn';
import { COLUMNS } from '../store/taskModel';
import { createTaskActions, sampleTasks } from './storyData';

export default {
  title: 'Organisms/TaskColumn',
  component: TaskColumn,
  parameters: { frame: 'column' },
  decorators: [
    (Story) => (
      <DndContext>
        <Story />
      </DndContext>
    ),
  ],
  args: {
    column: COLUMNS[0],
    tasks: sampleTasks.filter((task) => task.status === 'todo'),
    total: 3,
    filtered: false,
    ...createTaskActions(),
  },
};

export const ToDo = {};
export const InProgress = {
  args: {
    column: COLUMNS[1],
    tasks: sampleTasks.filter((task) => task.status === 'progress'),
    total: 2,
  },
};
export const Done = {
  args: { column: COLUMNS[2], tasks: sampleTasks.filter((task) => task.status === 'done') },
};
export const Empty = { args: { tasks: [], total: 0 } };
export const NoMatches = { args: { tasks: [], filtered: true } };
