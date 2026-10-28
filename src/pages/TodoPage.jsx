import { useEffect, useMemo, useState } from 'react';
import { ArrowRight, CheckCircle2 } from 'lucide-react';
import { useTasks } from '../store/useTasks';
import { useTheme } from '../store/useTheme';
import { filterTasks } from '../store/taskModel';
import WorkspaceLayout from '../components/templates/WorkspaceLayout';
import TaskToolbar from '../components/organisms/TaskToolbar';
import TaskBoard from '../components/organisms/TaskBoard';
import Modal from '../components/molecules/Modal';
import TaskForm from '../components/molecules/TaskForm';
import Button from '../components/atoms/Button';
import styles from './TodoPage.module.css';

export default function TodoPage() {
  const { tasks, loaded, storageError, dispatch } = useTasks();
  const { theme, toggleTheme } = useTheme();
  const [filters, setFilters] = useState({ search: '', priority: 'all', due: 'all' });
  const [dialog, setDialog] = useState(null);
  const [notice, setNotice] = useState('');
  const visibleTasks = useMemo(() => filterTasks(tasks, filters), [tasks, filters]);
  const completed = tasks.filter((task) => task.status === 'done').length;
  const filtered = !!(filters.search.trim() || filters.priority !== 'all' || filters.due !== 'all');
  const changeFilters = (changes) => setFilters((current) => ({ ...current, ...changes }));
  const openCreate = (status = 'todo') => setDialog({ type: 'create', status });
  const notify = (message) => setNotice(message);

  useEffect(() => {
    if (!notice) return;
    const timeout = setTimeout(() => setNotice(''), 3500);
    return () => clearTimeout(timeout);
  }, [notice]);

  useEffect(() => {
    const shortcuts = (event) => {
      if (event.key !== '/' || event.ctrlKey || event.metaKey || event.altKey || dialog) return;
      if (
        event.target instanceof HTMLElement &&
        event.target.closest('input, textarea, select, [contenteditable="true"]')
      )
        return;
      event.preventDefault();
      document.getElementById('task-search')?.focus();
    };
    window.addEventListener('keydown', shortcuts);
    return () => window.removeEventListener('keydown', shortcuts);
  }, [dialog]);

  const submitTask = (values) => {
    if (dialog.type === 'edit') {
      dispatch({ type: 'update', id: dialog.task.id, changes: values });
      notify('Tâche mise à jour. Continuez sur votre lancée !');
    } else {
      dispatch({ type: 'create', task: { ...values, id: crypto.randomUUID() } });
      notify('Tâche ajoutée. Un pas de plus !');
    }
    setDialog(null);
  };
  const completeTask = (task) => {
    const status = task.status === 'done' ? 'todo' : 'done';
    dispatch({ type: 'update', id: task.id, changes: { status } });
    notify(
      status === 'done'
        ? 'Tâche terminée. Une petite victoire à célébrer !'
        : 'Tâche replacée dans la colonne « À faire ».'
    );
  };

  return (
    <WorkspaceLayout
      search={filters.search}
      onSearch={(search) => changeFilters({ search })}
      onAdd={() => openCreate()}
      theme={theme}
      onToggleTheme={toggleTheme}
      completed={completed}
      total={tasks.length}
      loaded={loaded}
      storageError={storageError}
    >
      <TaskToolbar
        filters={filters}
        onChange={changeFilters}
        total={tasks.length}
        completed={completed}
        visible={visibleTasks.length}
      />
      {storageError && (
        <p className={styles.warning} role="alert">
          Votre navigateur ne peut pas lire ou enregistrer les tâches. Vérifiez que le stockage du
          site est autorisé. Les modifications restent disponibles pour cette session.
        </p>
      )}
      {loaded ? (
        <TaskBoard
          tasks={visibleTasks}
          allTasks={tasks}
          filtered={filtered}
          onAdd={openCreate}
          onEdit={(task) => setDialog({ type: 'edit', task })}
          onDelete={(task) => setDialog({ type: 'delete', task })}
          onComplete={completeTask}
          onMove={(id, status, overId) => {
            dispatch({ type: 'move', id, status, overId });
            notify('Tâche déplacée. Votre tableau est à jour.');
          }}
        />
      ) : (
        <div className={styles.loading} role="status">
          <span />
          Préparation de votre espace…
        </div>
      )}
      <div className={styles.live} role="status" aria-live="polite" aria-atomic="true">
        {notice && (
          <span className={styles.toast}>
            <CheckCircle2 size={18} />
            {notice}
          </span>
        )}
      </div>
      {dialog && (
        <Modal
          title={
            dialog.type === 'delete'
              ? 'Supprimer cette tâche ?'
              : dialog.type === 'edit'
                ? 'Modifier la tâche'
                : 'Nouvelle tâche'
          }
          description={
            dialog.type === 'delete'
              ? 'Cette tâche sera définitivement supprimée de cet appareil.'
              : dialog.type === 'edit'
                ? 'Modifiez les détails et continuez à avancer.'
                : 'Les grandes idées commencent par une petite tâche.'
          }
          onClose={() => setDialog(null)}
        >
          {dialog.type === 'delete' ? (
            <div className={styles.delete}>
              <p>« {dialog.task.title} »</p>
              <div>
                <Button variant="secondary" onClick={() => setDialog(null)}>
                  Conserver
                </Button>
                <Button
                  variant="danger"
                  onClick={() => {
                    dispatch({ type: 'delete', id: dialog.task.id });
                    setDialog(null);
                    notify('Tâche supprimée.');
                  }}
                >
                  Supprimer
                  <ArrowRight size={16} />
                </Button>
              </div>
            </div>
          ) : (
            <TaskForm
              task={dialog.task}
              initialStatus={dialog.status}
              onSubmit={submitTask}
              onCancel={() => setDialog(null)}
            />
          )}
        </Modal>
      )}
    </WorkspaceLayout>
  );
}
