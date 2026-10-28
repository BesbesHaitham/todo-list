import { useState } from 'react';
import { fn } from 'storybook/test';
import { Check, Star } from 'lucide-react';
import Badge from '../components/atoms/Badge';
import Button from '../components/atoms/Button';

export default {
  title: 'Atoms/Badge',
  component: Badge,
  args: {
    children: 'Neutral',
    variant: 'neutral',
    size: 'md',
    appearance: 'soft',
    dot: false,
    disabled: false,
  },
  argTypes: {
    variant: {
      control: 'select',
      options: ['neutral', 'primary', 'high', 'medium', 'low', 'danger', 'warning', 'success'],
    },
    size: { control: 'select', options: ['xs', 'sm', 'md', 'lg', 'xl'] },
    appearance: { control: 'select', options: ['soft', 'outline', 'solid'] },
    radius: { control: 'select', options: [undefined, 'none', 'sm', 'md', 'lg', 'full'] },
    label: { control: 'text' },
    startIcon: { control: false },
    endIcon: { control: false },
    ref: { control: false },
    className: { control: 'text' },
  },
};

export const Neutral = {};
export const Primary = { args: { children: 'New', variant: 'primary' } };
export const High = { args: { children: 'High', variant: 'high' } };
export const Medium = { args: { children: 'Medium', variant: 'medium' } };
export const Low = { args: { children: 'Low', variant: 'low' } };
export const Counter = { args: { children: 3, size: 'sm' } };
export const Outline = { args: { appearance: 'outline', children: 'Optional' } };
export const Solid = { args: { appearance: 'solid', variant: 'primary', children: 'New' } };
export const Pill = { args: { radius: 'full', children: 'Category' } };
export const WithDot = { args: { dot: true, variant: 'success', children: 'Available' } };
export const WithIcon = { args: { startIcon: <Check />, variant: 'success', children: 'Correct' } };
export const Score = { args: { startIcon: <Star />, children: '10 points', variant: 'warning' } };
export const LabelProp = { args: { children: undefined, label: 'Featured' } };
export const Removable = {
  args: { children: 'Design', onRemove: fn(), removeLabel: 'Remove Design category' },
  render: function Render(args) {
    const [visible, setVisible] = useState(true);
    return visible ? (
      <Badge
        {...args}
        onRemove={(event) => {
          args.onRemove(event);
          setVisible(false);
        }}
      />
    ) : (
      <Button variant="ghost" size="sm" onClick={() => setVisible(true)}>
        Restore badge
      </Button>
    );
  },
};
export const DisabledRemoval = {
  args: {
    children: 'Required',
    disabled: true,
    onRemove: fn(),
    removeLabel: 'Remove required category',
  },
};
