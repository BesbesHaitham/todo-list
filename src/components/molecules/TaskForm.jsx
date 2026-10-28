import { useId, useState } from 'react';
import { ArrowRight } from 'lucide-react';
import Button from '../atoms/Button';
import Input from '../atoms/Input';
import { COLUMNS, PRIORITIES, validDate } from '../../store/taskModel';
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
      setError('Please give your task a title.');
      return;
    }
    if (!validDate(values.dueDate)) {
      setError('Please choose a valid due date.');
      return;
    }
    onSubmit({ ...values, title: values.title.trim(), description: values.description.trim() });
  };
  return (
    <form onSubmit={submit} className={styles.base}>
      <div className={styles.field}>
        <label htmlFor={fieldId('title')}>
          Task title <span className={styles.required}>*</span>
        </label>
        <Input
          id={fieldId('title')}
          name="title"
          placeholder="What needs to get done?"
          value={values.title}
          onChange={update}
          maxLength={120}
          required
          autoFocus
          aria-invalid={!!error}
          aria-describedby={error ? fieldId('error') : undefined}
        />
      </div>
      <div className={styles.field}>
        <label htmlFor={fieldId('description')}>
          Description <span>Optional</span>
        </label>
        <Input
          as="textarea"
          id={fieldId('description')}
          name="description"
          placeholder="A few details to keep you on track…"
          value={values.description}
          onChange={update}
          maxLength={2000}
          rows={3}
        />
      </div>
      <div className={styles.row}>
        <div className={styles.field}>
          <label htmlFor={fieldId('priority')}>Priority</label>
          <Input
            as="select"
            id={fieldId('priority')}
            name="priority"
            value={values.priority}
            onChange={update}
          >
            {PRIORITIES.map((priority) => (
              <option key={priority} value={priority}>
                {priority[0].toUpperCase() + priority.slice(1)}
              </option>
            ))}
          </Input>
        </div>
        <div className={styles.field}>
          <label htmlFor={fieldId('dueDate')}>
            Due date <span>Optional</span>
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
        <label htmlFor={fieldId('status')}>Status</label>
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
          Cancel
        </Button>
        <Button type="submit">
          {task ? 'Save changes' : 'Create task'}
          <ArrowRight size={16} />
        </Button>
      </div>
    </form>
  );
}
