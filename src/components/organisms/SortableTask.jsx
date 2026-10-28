import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import TaskCard from '../molecules/TaskCard';
import styles from './SortableTask.module.css';

export default function SortableTask({ task, ...props }) {
  const {
    setNodeRef,
    setActivatorNodeRef,
    attributes,
    listeners,
    transform,
    transition,
    isDragging,
  } = useSortable({ id: task.id, data: { status: task.status, type: 'task' } });
  return (
    <div
      ref={setNodeRef}
      className={styles.base}
      style={{
        transform: CSS.Transform.toString(transform),
        transition,
        opacity: isDragging ? 0.25 : 1,
      }}
    >
      <TaskCard
        task={task}
        dragHandleProps={{ ...attributes, ...listeners }}
        dragHandleRef={setActivatorNodeRef}
        {...props}
      />
    </div>
  );
}
