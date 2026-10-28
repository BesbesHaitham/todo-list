import { CalendarDays, GripVertical, Pencil, Trash2 } from 'lucide-react';
import Badge from '../atoms/Badge';
import Checkbox from '../atoms/Checkbox';
import IconButton from '../atoms/IconButton';
import styles from './TaskCard.module.css';

const dateFormatter = new Intl.DateTimeFormat('en-US', {
  month: 'short',
  day: 'numeric',
  year: 'numeric',
});

export default function TaskCard({
  task,
  onEdit,
  onDelete,
  onComplete,
  dragHandleProps,
  dragHandleRef,
  overlay = false,
}) {
  const done = task.status === 'done';
  return (
    <article
      className={`${styles.base} ${done ? styles.completed : ''} ${overlay ? styles.overlay : ''}`.trim()}
      data-task-id={task.id}
    >
      <div className={styles.body}>
        <Checkbox
          checked={done}
          onChange={() => onComplete?.(task)}
          aria-label={`${done ? 'Reopen' : 'Complete'} ${task.title}`}
          className={styles.checkbox}
          tabIndex={overlay ? -1 : 0}
        />
        <div className={styles.content}>
          <h3>
            <button type="button" onClick={() => onEdit?.(task)} tabIndex={overlay ? -1 : 0}>
              {task.title}
            </button>
          </h3>
          {task.description && <p>{task.description}</p>}
        </div>
        <button
          ref={dragHandleRef}
          type="button"
          {...dragHandleProps}
          className={styles.drag}
          aria-label={`Move ${task.title}`}
          title="Drag to move · Space + arrows with keyboard"
          tabIndex={overlay ? -1 : 0}
        >
          <GripVertical size={18} />
        </button>
      </div>
      <footer className={styles.footer}>
        <span className={styles.date}>
          <CalendarDays size={16} />
          {task.dueDate ? (
            <time dateTime={task.dueDate}>
              {dateFormatter.format(new Date(`${task.dueDate}T12:00:00`))}
            </time>
          ) : (
            <span>No due date</span>
          )}
        </span>
        <div className={styles.actions}>
          <IconButton
            label={`Edit ${task.title}`}
            size="sm"
            onClick={() => onEdit?.(task)}
            tabIndex={overlay ? -1 : 0}
          >
            <Pencil size={14} />
          </IconButton>
          <IconButton
            label={`Delete ${task.title}`}
            size="sm"
            onClick={() => onDelete?.(task)}
            tabIndex={overlay ? -1 : 0}
          >
            <Trash2 size={14} />
          </IconButton>
        </div>
        <Badge variant={task.priority}>
          {task.priority[0].toUpperCase() + task.priority.slice(1)}
        </Badge>
      </footer>
    </article>
  );
}
