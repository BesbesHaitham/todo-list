import { RotateCcw, SlidersHorizontal } from 'lucide-react';
import Button from '../atoms/Button';
import Input from '../atoms/Input';
import styles from './TaskToolbar.module.css';

export default function TaskToolbar({ filters, onChange, total, completed, visible }) {
  const active = filters.search.trim() || filters.priority !== 'all' || filters.due !== 'all';
  return (
    <section className={styles.base} aria-label="Task filters">
      <div className={styles.summary}>
        <h2>
          Your workspace<span className={styles.dot}>.</span>
        </h2>
        <p>
          {active
            ? `${visible} of ${total} tasks match your filters`
            : `${total} tasks. ${completed} completed. One step at a time.`}
        </p>
      </div>
      <div className={styles.filters}>
        <span className={styles.filterLabel}>
          <SlidersHorizontal size={15} />
          Filter by
        </span>
        <label className="sr-only" htmlFor="priority-filter">
          Filter by priority
        </label>
        <Input
          as="select"
          id="priority-filter"
          className={styles.select}
          value={filters.priority}
          onChange={(event) => onChange({ priority: event.target.value })}
        >
          <option value="all">All priorities</option>
          <option value="high">High priority</option>
          <option value="medium">Medium priority</option>
          <option value="low">Low priority</option>
        </Input>
        <label className="sr-only" htmlFor="due-filter">
          Filter by due date
        </label>
        <Input
          as="select"
          id="due-filter"
          className={styles.select}
          value={filters.due}
          onChange={(event) => onChange({ due: event.target.value })}
        >
          <option value="all">Any due date</option>
          <option value="today">Due today</option>
          <option value="overdue">Overdue</option>
        </Input>
        {active && (
          <Button
            size="sm"
            variant="ghost"
            onClick={() => onChange({ search: '', priority: 'all', due: 'all' })}
          >
            <RotateCcw size={14} />
            Reset
          </Button>
        )}
      </div>
    </section>
  );
}
