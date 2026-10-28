import { useId, useState } from 'react';
import { ArrowRight } from 'lucide-react';
import Button from '../atoms/Button';
import Input from '../atoms/Input';
import { COLUMNS, PRIORITIES, PRIORITY_LABELS, validDate } from '../../store/taskModel';
import styles from './TaskForm.module.css';

export default function TaskForm({ task, initialStatus = 'todo', onSubmit, onCancel }) {
  const prefix = useId();
  const [values, setValues] = useState({
    title: task?.title || '',
    description: task?.description || '',
    priority: task?.priority || 'medium',
    dueDate: task?.dueDate || '',
    status: task?.status || initialStatus,
  });
  const [error, setError] = useState('');
  const update = (event) =>
    setValues((current) => ({ ...current, [event.target.name]: event.target.value }));
  const fieldId = (name) => `${prefix}-${name}`;
  const submit = (event) => {
    event.preventDefault();
    if (!values.title.trim()) {
      setError('Veuillez donner un titre à votre tâche.');
      return;
    }
    if (!validDate(values.dueDate)) {
      setError('Veuillez choisir une échéance valide.');
      return;
    }
    onSubmit({ ...values, title: values.title.trim(), description: values.description.trim() });
  };
  return (
    <form onSubmit={submit} className={styles.base}>
      <div className={styles.field}>
        <label htmlFor={fieldId('title')}>
          Titre de la tâche <span className={styles.required}>*</span>
        </label>
        <Input
          id={fieldId('title')}
          name="title"
          placeholder="Que souhaitez-vous faire ?"
          value={values.title}
          onChange={update}
          maxLength={120}
          required
          onInvalid={(event) =>
            event.target.setCustomValidity('Veuillez donner un titre à votre tâche.')
          }
          onInput={(event) => event.target.setCustomValidity('')}
          autoFocus
          aria-invalid={!!error}
          aria-describedby={error ? fieldId('error') : undefined}
        />
      </div>
      <div className={styles.field}>
        <label htmlFor={fieldId('description')}>
          Description <span>Facultatif</span>
        </label>
        <Input
          as="textarea"
          id={fieldId('description')}
          name="description"
          placeholder="Quelques détails pour vous guider…"
          value={values.description}
          onChange={update}
          maxLength={2000}
          rows={3}
        />
      </div>
      <div className={styles.row}>
        <div className={styles.field}>
          <label htmlFor={fieldId('priority')}>Priorité</label>
          <Input
            as="select"
            id={fieldId('priority')}
            name="priority"
            value={values.priority}
            onChange={update}
          >
            {PRIORITIES.map((priority) => (
              <option key={priority} value={priority}>
                {PRIORITY_LABELS[priority]}
              </option>
            ))}
          </Input>
        </div>
        <div className={styles.field}>
          <label htmlFor={fieldId('dueDate')}>
            Échéance <span>Facultatif</span>
          </label>
          <Input
            type="date"
            id={fieldId('dueDate')}
            name="dueDate"
            min="0001-01-01"
            max="9999-12-31"
            value={values.dueDate}
            onChange={update}
          />
        </div>
      </div>
      <div className={styles.field}>
        <label htmlFor={fieldId('status')}>Statut</label>
        <Input
          as="select"
          id={fieldId('status')}
          name="status"
          value={values.status}
          onChange={update}
        >
          {COLUMNS.map((column) => (
            <option key={column.id} value={column.id}>
              {column.label}
            </option>
          ))}
        </Input>
      </div>
      {error && (
        <p role="alert" id={fieldId('error')} className={styles.error}>
          {error}
        </p>
      )}
      <div className={styles.footer}>
        <Button variant="secondary" onClick={onCancel}>
          Annuler
        </Button>
        <Button type="submit">
          {task ? 'Enregistrer' : 'Créer la tâche'}
          <ArrowRight size={16} />
        </Button>
      </div>
    </form>
  );
}
