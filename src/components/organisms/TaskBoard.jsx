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
        screenReaderInstructions: {
          draggable:
            'Press Space to pick up a task. Use arrow keys to move it between positions and columns. Press Space to drop, or Escape to cancel. You can also change status in the edit dialog.',
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
