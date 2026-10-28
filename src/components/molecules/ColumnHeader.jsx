import { Check, Circle, CircleDot, Plus } from 'lucide-react';
import Badge from '../atoms/Badge';
import IconButton from '../atoms/IconButton';
import styles from './ColumnHeader.module.css';

const icons = { todo: Circle, progress: CircleDot, done: Check };

export default function ColumnHeader({ column, count, total = count, onAdd }) {
  const Icon = icons[column.id];
  return (
    <header className={styles.base}>
      <span className={`${styles.indicator} ${styles[column.id] || ''}`.trim()}>
        <Icon size={18} strokeWidth={3} />
      </span>
      <h2 id={`heading-${column.id}`}>{column.label}</h2>
      <Badge variant={column.variant} className={styles.count}>
        {count === total ? count : `${count}/${total}`}
      </Badge>
      <IconButton
        label={`Add task to ${column.label}`}
        size="sm"
        onClick={onAdd}
        className={styles.add}
      >
        <Plus size={18} />
      </IconButton>
    </header>
  );
}
