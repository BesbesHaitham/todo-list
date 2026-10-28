import { fn } from 'storybook/test';
import { ArrowRight, Download, Plus } from 'lucide-react';
import Button from '../components/atoms/Button';

export default {
  title: 'Atoms/Button',
  component: Button,
  args: {
    children: 'Save changes',
    variant: 'primary',
    size: 'md',
    disabled: false,
    loading: false,
    fullWidth: false,
    onClick: fn(),
    onFocus: fn(),
    onBlur: fn(),
  },
  argTypes: {
    variant: {
      control: 'select',
      options: ['primary', 'secondary', 'ghost', 'danger', 'success', 'outline', 'link'],
    },
    size: { control: 'select', options: ['xs', 'sm', 'md', 'lg', 'xl'] },
    radius: { control: 'select', options: [undefined, 'none', 'sm', 'md', 'lg', 'full'] },
    type: { control: 'select', options: ['button', 'submit', 'reset'] },
    label: { control: 'text', description: 'Text fallback when children is not supplied.' },
    loadingLabel: { control: 'text' },
    startIcon: { control: false },
    endIcon: { control: false },
    ref: { control: false },
    className: { control: 'text' },
  },
};

export const Primary = {};
export const Secondary = { args: { variant: 'secondary' } };
export const Ghost = { args: { variant: 'ghost' } };
export const Danger = { args: { variant: 'danger', children: 'Delete task' } };
export const Disabled = { args: { disabled: true } };
export const Small = { args: { size: 'sm' } };
export const Large = { args: { size: 'lg' } };
export const ExtraSmall = { args: { size: 'xs' } };
export const ExtraLarge = { args: { size: 'xl' } };
export const Outline = { args: { variant: 'outline' } };
export const Success = { args: { variant: 'success', children: 'Correct answer' } };
export const Link = { args: { variant: 'link', children: 'View details' } };
export const Loading = { args: { loading: true } };
export const LoadingWithLabel = { args: { loading: true, loadingLabel: 'Saving…' } };
export const WithIcons = {
  args: { startIcon: <Plus />, endIcon: <ArrowRight />, children: 'Add question' },
};
export const DownloadAction = { args: { startIcon: <Download />, children: 'Download results' } };
export const FullWidth = { args: { fullWidth: true } };
export const Pill = { args: { radius: 'full' } };
export const LabelProp = { args: { children: undefined, label: 'Continue' } };
