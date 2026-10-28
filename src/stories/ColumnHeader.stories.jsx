import { fn } from 'storybook/test';
import ColumnHeader from '../components/molecules/ColumnHeader';
import { COLUMNS } from '../store/taskModel';

export default {
  title: 'Molecules/ColumnHeader',
  component: ColumnHeader,
  parameters: { frame: 'card' },
  args: { column: COLUMNS[0], count: 3, total: 3, onAdd: fn() },
};

export const ToDo = {};
export const InProgress = { args: { column: COLUMNS[1], count: 2, total: 2 } };
export const Done = { args: { column: COLUMNS[2] } };
export const Filtered = { args: { count: 1, total: 3 } };
export const Empty = { args: { count: 0, total: 0 } };
