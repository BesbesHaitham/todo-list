import { useArgs } from 'storybook/preview-api';
import { fn } from 'storybook/test';
import Checkbox from '../components/atoms/Checkbox';

export default {
  title: 'Atoms/Checkbox',
  component: Checkbox,
  args: {
    checked: false,
    'aria-label': 'Complete task',
    variant: 'default',
    size: 'md',
    indeterminate: false,
    invalid: false,
    disabled: false,
    required: false,
    onChange: fn(),
    onCheckedChange: fn(),
  },
  argTypes: {
    variant: { control: 'select', options: ['default', 'primary', 'danger'] },
    size: { control: 'select', options: ['xs', 'sm', 'md', 'lg', 'xl'] },
    radius: { control: 'select', options: [undefined, 'none', 'sm', 'md', 'lg', 'full'] },
    ref: { control: false },
    className: { control: 'text' },
  },
  render: function Render(args) {
    const [, updateArgs] = useArgs();
    return (
      <Checkbox
        {...args}
        onChange={(event) => {
          args.onChange(event);
          updateArgs({ checked: event.target.checked, indeterminate: false });
        }}
      />
    );
  },
};

export const Unchecked = {};
export const Checked = { args: { checked: true } };
export const Primary = { args: { checked: true, variant: 'primary' } };
export const Small = { args: { size: 'sm' } };
export const Large = { args: { size: 'lg' } };
export const Disabled = { args: { disabled: true } };
export const Indeterminate = { args: { indeterminate: true } };
export const Danger = { args: { variant: 'danger', checked: true } };
export const Invalid = { args: { invalid: true, required: true } };
export const Rounded = { args: { radius: 'full', checked: true } };
export const ExtraSmall = { args: { size: 'xs' } };
export const ExtraLarge = { args: { size: 'xl', checked: true } };
export const Uncontrolled = {
  args: { checked: undefined, defaultChecked: true, name: 'answer', value: 'a' },
  render: (args) => <Checkbox {...args} />,
};
