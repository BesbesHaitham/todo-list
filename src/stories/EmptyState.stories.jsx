import { fn } from 'storybook/test';
import EmptyState from '../components/molecules/EmptyState';

export default {
  title: 'Molecules/EmptyState',
  component: EmptyState,
  parameters: { frame: 'card' },
  args: { filtered: false, onAdd: fn() },
};

export const EmptyColumn = {};
export const NoMatches = { args: { filtered: true } };
