import { MemoryRouter } from 'react-router-dom';
import { useArgs, useGlobals } from 'storybook/preview-api';
import { fn } from 'storybook/test';
import WorkspaceLayout from '../components/templates/WorkspaceLayout';
import TaskBoard from '../components/organisms/TaskBoard';
import { createTaskActions, sampleTasks } from './storyData';

export default {
  title: 'Templates/WorkspaceLayout',
  component: WorkspaceLayout,
  parameters: { layout: 'fullscreen' },
  decorators: [
    (Story) => (
      <MemoryRouter>
        <Story />
      </MemoryRouter>
    ),
  ],
  args: {
    search: '',
    completed: 3,
    total: 8,
    loaded: true,
    storageError: false,
    onSearch: fn(),
    onAdd: fn(),
    onToggleTheme: fn(),
    children: (
      <TaskBoard
        tasks={sampleTasks}
        allTasks={sampleTasks}
        filtered={false}
        onMove={fn()}
        {...createTaskActions()}
      />
    ),
  },
  argTypes: { children: { control: false }, theme: { control: false } },
  render: function Render(args) {
    const [, updateArgs] = useArgs();
    const [globals, updateGlobals] = useGlobals();
    return (
      <WorkspaceLayout
        {...args}
        theme={globals.theme}
        onSearch={(search) => {
          args.onSearch(search);
          updateArgs({ search });
        }}
        onToggleTheme={() => {
          args.onToggleTheme();
          updateGlobals({ theme: globals.theme === 'light' ? 'dark' : 'light' });
        }}
      />
    );
  },
};

export const Default = {};
export const Loading = {
  args: { loaded: false, total: 0, completed: 0, children: 'Setting up your workspace…' },
};
export const StorageUnavailable = { args: { storageError: true } };
