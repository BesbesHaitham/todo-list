import { DndContext } from '@dnd-kit/core';
import { SortableContext } from '@dnd-kit/sortable';
import SortableTask from '../components/organisms/SortableTask';
import { createTaskActions, sampleTask } from './storyData';

export default {
  title: 'Organisms/SortableTask',
  component: SortableTask,
  parameters: { frame: 'card' },
  decorators: [
    (Story, context) => (
      <DndContext>
        <SortableContext items={[context.args.task.id]}>
          <Story />
        </SortableContext>
      </DndContext>
    ),
  ],
  args: { task: sampleTask, ...createTaskActions() },
};

export const Default = {};
export const Completed = { args: { task: { ...sampleTask, status: 'done' } } };
