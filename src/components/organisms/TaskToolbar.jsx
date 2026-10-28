import { RotateCcw, SlidersHorizontal } from 'lucide-react';
import Button from '../atoms/Button';
import Input from '../atoms/Input';
import styles from './TaskToolbar.module.css';

export default function TaskToolbar({ filters, onChange, total, completed, visible }) {
  const active = filters.search.trim() || filters.priority !== 'all' || filters.due !== 'all';
  return (
    <section className={styles.base} aria-label="Filtres des tâches">
      <div className={styles.summary}>
        <h2>
          Votre espace<span className={styles.dot}>.</span>
        </h2>
        <p>
          {active
            ? `Résultats : ${visible} sur ${total} tâche${total > 1 ? 's' : ''}`
            : `${total} tâche${total > 1 ? 's' : ''}. ${completed} terminée${completed > 1 ? 's' : ''}. Un pas à la fois.`}
        </p>
      </div>
      <div className={styles.filters}>
        <span className={styles.filterLabel}>
          <SlidersHorizontal size={15} />
          Filtrer par
        </span>
        <label className="sr-only" htmlFor="priority-filter">
          Filtrer par priorité
        </label>
        <Input
          as="select"
          id="priority-filter"
          className={styles.select}
          value={filters.priority}
          onChange={(event) => onChange({ priority: event.target.value })}
        >
          <option value="all">Toutes les priorités</option>
          <option value="high">Priorité élevée</option>
          <option value="medium">Priorité moyenne</option>
          <option value="low">Priorité faible</option>
        </Input>
        <label className="sr-only" htmlFor="due-filter">
          Filtrer par échéance
        </label>
        <Input
          as="select"
          id="due-filter"
          className={styles.select}
          value={filters.due}
          onChange={(event) => onChange({ due: event.target.value })}
        >
          <option value="all">Toutes les échéances</option>
          <option value="today">Pour aujourd’hui</option>
          <option value="overdue">En retard</option>
        </Input>
        {active && (
          <Button
            size="sm"
            variant="ghost"
            onClick={() => onChange({ search: '', priority: 'all', due: 'all' })}
          >
            <RotateCcw size={14} />
            Réinitialiser
          </Button>
        )}
      </div>
    </section>
  );
}
