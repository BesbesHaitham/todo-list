import { fn } from 'storybook/test';
import { useRef } from 'react';
import Input from '../components/atoms/Input';
import Button from '../components/atoms/Button';

export default {
  title: 'Atoms/Input',
  component: Input,
  args: {
    placeholder: 'What needs to get done?',
    'aria-label': 'Example input',
    variant: 'default',
    size: 'md',
    fullWidth: true,
    invalid: false,
    disabled: false,
    readOnly: false,
    required: false,
    onChange: fn(),
    onFocus: fn(),
    onBlur: fn(),
  },
  argTypes: {
    as: { control: 'select', options: ['input', 'textarea', 'select'] },
    variant: { control: 'select', options: ['default', 'filled', 'underline'] },
    size: { control: 'select', options: ['xs', 'sm', 'md', 'lg', 'xl'] },
    radius: { control: 'select', options: [undefined, 'none', 'sm', 'md', 'lg', 'full'] },
    resize: { control: 'select', options: [undefined, 'none', 'vertical', 'horizontal', 'both'] },
    htmlSize: {
      control: 'number',
      description: 'Native size attribute; visual sizing uses size instead.',
    },
    options: {
      control: 'object',
      description:
        'Optional select options: { value, label, disabled }[]. Children take precedence.',
    },
    ref: { control: false },
    className: { control: 'text' },
  },
};

export const Default = {};
export const Filled = { args: { variant: 'filled' } };
export const Description = { args: { as: 'textarea', rows: 4, placeholder: 'Add a few details…' } };
export const Select = {
  args: {
    as: 'select',
    defaultValue: 'medium',
    children: (
      <>
        <option value="high">High</option>
        <option value="medium">Medium</option>
        <option value="low">Low</option>
      </>
    ),
  },
};
export const DueDate = { args: { type: 'date', defaultValue: '2026-10-28' } };
export const Invalid = { args: { 'aria-invalid': true, defaultValue: 'Invalid example' } };
export const Disabled = { args: { disabled: true } };
export const Underline = { args: { variant: 'underline' } };
export const ReadOnly = { args: { readOnly: true, defaultValue: 'Read-only answer' } };
export const RequiredEmail = {
  args: {
    type: 'email',
    name: 'email',
    autoComplete: 'email',
    required: true,
    placeholder: 'you@example.com',
  },
};
export const Numeric = { args: { type: 'number', min: 1, max: 10, step: 1, defaultValue: 5 } };
export const Password = { args: { type: 'password', autoComplete: 'new-password', minLength: 8 } };
export const WithValidationState = { args: { invalid: true, defaultValue: 'Incorrect answer' } };
export const FixedTextarea = { args: { as: 'textarea', resize: 'none', rows: 4, maxLength: 500 } };
export const Compact = { args: { size: 'xs', fullWidth: false, htmlSize: 12 } };
export const SelectFromOptions = {
  args: {
    as: 'select',
    defaultValue: 'medium',
    options: [
      { value: 'high', label: 'High' },
      { value: 'medium', label: 'Medium' },
      { value: 'low', label: 'Low', disabled: true },
    ],
  },
};
export const MultipleSelect = {
  args: {
    ...SelectFromOptions.args,
    multiple: true,
    defaultValue: ['high', 'medium'],
    htmlSize: 3,
  },
};
export const FocusWithRef = {
  render: function Render(args) {
    const ref = useRef(null);
    return (
      <>
        <Button variant="secondary" onClick={() => ref.current?.focus()}>
          Focus input
        </Button>
        <Input {...args} ref={ref} />
      </>
    );
  },
};
