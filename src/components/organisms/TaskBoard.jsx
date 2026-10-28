import { useState } from 'react';
import {
  DndContext,
  DragOverlay,
  KeyboardSensor,
  PointerSensor,
  closestCorners,
  pointerWithin,
  useSensor,
  useSensors,
} from '@dnd-kit/core';
import { sortableKeyboardCoordinates } from '@dnd-kit/sortable';
import { COLUMNS } from '../../store/taskModel';
import TaskCard from '../molecules/TaskCard';
import TaskColumn from './TaskColumn';
import styles from './TaskBoard.module.css';

// Prefer a card inside the column under the pointer; keyboard uses geometric collisions.
function collisionDetection(args) {
  const hits = pointerWithin(args);
  if (hits.length) {
    const cards = hits.filter(
      (hit) =>
        args.droppableContainers.find((container) => container.id === hit.id)?.data.current
          ?.type === 'task'
    );
    return cards.length ? cards : hits;
  }
  return closestCorners(args);
}

export default function TaskBoard({ tasks, allTasks, filtered, onMove, ...actions }) {
  const [activeId, setActiveId] = useState(null);
  const sensors = useSensors(
    useSensor(PointerSensor, { activationConstraint: { distance: 6 } }),
    useSensor(KeyboardSensor, { coordinateGetter: sortableKeyboardCoordinates })
  );
  const activeTask = allTasks.find((task) => task.id === activeId);
  const taskTitle = (id) => allTasks.find((task) => task.id === id)?.title || 'Tâche';
  const dropLabel = (over) =>
    COLUMNS.find((column) => column.id === over.id)?.label || taskTitle(over.id);
  const finishDrag = ({ active, over }) => {
    setActiveId(null);
    if (!over || active.id === over.id) return;
    const status = over.data.current?.status;
    if (status) onMove(active.id, status, over.id);
  };
  return (
    <DndContext
      sensors={sensors}
      collisionDetection={collisionDetection}
      onDragStart={({ active }) => setActiveId(active.id)}
      onDragEnd={finishDrag}
      onDragCancel={() => setActiveId(null)}
      accessibility={{
        announcements: {
          onDragStart: ({ active }) =>
            `Tâche « ${taskTitle(active.id)} » sélectionnée pour le déplacement.`,
          onDragOver: ({ active, over }) =>
            over
              ? `Tâche « ${taskTitle(active.id)} » au-dessus de « ${dropLabel(over)} ».`
              : 'La tâche est en dehors des zones de dépôt.',
          onDragEnd: ({ active, over }) =>
            over
              ? `Tâche « ${taskTitle(active.id)} » déposée dans « ${COLUMNS.find((column) => column.id === over.data.current?.status)?.label || dropLabel(over)} ».`
              : 'Déplacement annulé. La tâche conserve sa position.',
          onDragCancel: () => 'Déplacement annulé. La tâche conserve sa position.',
        },
        screenReaderInstructions: {
          draggable:
            'Appuyez sur Espace pour sélectionner une tâche. Utilisez les flèches pour la déplacer entre les positions et les colonnes. Appuyez sur Espace pour la déposer ou sur Échap pour annuler. Vous pouvez aussi modifier son statut dans le formulaire.',
        },
      }}
    >
      <div className={styles.base}>
        {COLUMNS.map((column) => (
          <TaskColumn
            key={column.id}
            column={column}
            tasks={tasks.filter((task) => task.status === column.id)}
            total={allTasks.filter((task) => task.status === column.id).length}
            filtered={filtered}
            {...actions}
          />
        ))}
      </div>
      <DragOverlay>{activeTask ? <TaskCard task={activeTask} overlay /> : null}</DragOverlay>
    </DndContext>
  );
}
