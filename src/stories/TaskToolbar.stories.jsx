import { useArgs } from 'storybook/preview-api';
import { fn } from 'storybook/test';
import TaskToolbar from '../components/organisms/TaskToolbar';
import { filterTasks } from '../store/taskModel';
import { sampleTasks } from './storyData';

export default {
  title: 'Organisms/TaskToolbar',
  component: TaskToolbar,
  parameters: { frame: 'board' },
  args: {
    filters: { search: '', priority: 'all', due: 'all' },
    total: 8,
    completed: 3,
    visible: 8,
    onChange: fn(),
  },
  render: function Render(args) {
    const [, updateArgs] = useArgs();
    return (
      <TaskToolbar
        {...args}
        onChange={(changes) => {
          args.onChange(changes);
          const filters = { ...args.filters, ...changes };
          updateArgs({ filters, visible: filterTasks(sampleTasks, filters).length });
        }}
      />
    );
  },
};

export const Default = {};
export const Filtered = {
  args: { filters: { search: '', priority: 'high', due: 'all' }, visible: 1 },
};
export const NoTasks = { args: { total: 0, completed: 0, visible: 0 } };
