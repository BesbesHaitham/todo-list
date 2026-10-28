import { useDroppable } from '@dnd-kit/core';
import { SortableContext, verticalListSortingStrategy } from '@dnd-kit/sortable';
import { Plus } from 'lucide-react';
import ColumnHeader from '../molecules/ColumnHeader';
import EmptyState from '../molecules/EmptyState';
import Button from '../atoms/Button';
import SortableTask from './SortableTask';
import styles from './TaskColumn.module.css';

export default function TaskColumn({
  column,
  tasks,
  total,
  filtered,
  onAdd,
  onEdit,
  onDelete,
  onComplete,
}) {
  const { setNodeRef, isOver } = useDroppable({
    id: column.id,
    data: { status: column.id, type: 'column' },
  });
  return (
    <section
      ref={setNodeRef}
      aria-labelledby={`heading-${column.id}`}
      className={`${styles.base} ${styles[column.id] || ''} ${isOver ? styles.over : ''}`.trim()}
      data-column={column.id}
    >
      <ColumnHeader
        column={column}
        count={tasks.length}
        total={total}
        onAdd={() => onAdd(column.id)}
      />
      <div className={styles.list}>
        <SortableContext
          items={tasks.map((task) => task.id)}
          strategy={verticalListSortingStrategy}
        >
          {tasks.map((task) => (
            <SortableTask
              key={task.id}
              task={task}
              onEdit={onEdit}
              onDelete={onDelete}
              onComplete={onComplete}
            />
          ))}
        </SortableContext>
        {!tasks.length && <EmptyState filtered={filtered} onAdd={() => onAdd(column.id)} />}
        {!!tasks.length && (
          <Button variant="ghost" size="sm" className={styles.add} onClick={() => onAdd(column.id)}>
            <Plus size={15} />
            Ajouter une tâche
          </Button>
        )}
      </div>
      <p className={styles.caption}>{column.description}</p>
    </section>
  );
}
