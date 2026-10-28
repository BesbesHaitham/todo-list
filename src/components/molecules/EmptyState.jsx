import { Inbox, Plus } from 'lucide-react';
import Button from '../atoms/Button';
import styles from './EmptyState.module.css';

export default function EmptyState({ filtered, onAdd }) {
  return (
    <div className={styles.base}>
      <span className={styles.icon}>
        <Inbox size={23} strokeWidth={1.5} />
      </span>
      <h3>{filtered ? 'No matching tasks' : 'A little room for possibility'}</h3>
      <p>{filtered ? 'Try a different search or filter.' : 'Add a task, or drag one here.'}</p>
      {!filtered && (
        <Button variant="ghost" size="sm" onClick={onAdd}>
          <Plus size={14} />
          Add a task
        </Button>
      )}
    </div>
  );
}
