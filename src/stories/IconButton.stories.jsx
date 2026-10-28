import { fn } from 'storybook/test';
import { useArgs } from 'storybook/preview-api';
import { Moon, Pencil, Plus, Trash2 } from 'lucide-react';
import IconButton from '../components/atoms/IconButton';

export default {
  title: 'Atoms/IconButton',
  component: IconButton,
  args: {
    label: 'Add task',
    children: <Plus />,
    variant: 'ghost',
    size: 'md',
    loading: false,
    disabled: false,
    onClick: fn(),
  },
  argTypes: {
    variant: {
      control: 'select',
      options: ['primary', 'secondary', 'ghost', 'danger', 'success', 'outline', 'link'],
    },
    size: { control: 'select', options: ['xs', 'sm', 'md', 'lg', 'xl'] },
    radius: { control: 'select', options: [undefined, 'none', 'sm', 'md', 'lg', 'full'] },
    loadingLabel: {
      control: 'text',
      description: 'Accessible name while the loading spinner is shown.',
    },
    pressed: { control: 'boolean', description: 'Optional aria-pressed value for toggle buttons.' },
    icon: { control: false },
    ref: { control: false },
    children: { control: false },
    className: { control: 'text' },
  },
};

export const Add = {};
export const Edit = { args: { label: 'Edit task', children: <Pencil />, variant: 'secondary' } };
export const Delete = { args: { label: 'Delete task', children: <Trash2 />, variant: 'danger' } };
export const ThemeToggle = { args: { label: 'Switch theme', children: <Moon /> } };
export const Disabled = { args: { disabled: true } };
export const Loading = { args: { loading: true, loadingLabel: 'Adding task' } };
export const Round = { args: { radius: 'full', variant: 'primary' } };
export const Outline = { args: { variant: 'outline' } };
export const IconProp = { args: { children: undefined, icon: <Pencil />, label: 'Edit answer' } };
export const ExtraSmall = { args: { size: 'xs' } };
export const ExtraLarge = { args: { size: 'xl' } };
export const Toggle = {
  args: { label: 'Toggle dark mode', children: <Moon />, pressed: false },
  render: function Render(args) {
    const [, updateArgs] = useArgs();
    return (
      <IconButton
        {...args}
        onClick={(event) => {
          args.onClick(event);
          updateArgs({ pressed: !args.pressed });
        }}
      />
    );
  },
};
