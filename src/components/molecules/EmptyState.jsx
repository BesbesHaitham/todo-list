import { Inbox, Plus } from 'lucide-react';
import Button from '../atoms/Button';
import styles from './EmptyState.module.css';

export default function EmptyState({ filtered, onAdd }) {
  return (
    <div className={styles.base}>
      <span className={styles.icon}>
        <Inbox size={23} strokeWidth={1.5} />
      </span>
      <h3>{filtered ? 'Aucune tâche correspondante' : 'De la place pour vos idées'}</h3>
      <p>
        {filtered
          ? 'Essayez une autre recherche ou un autre filtre.'
          : 'Ajoutez une tâche ou glissez-en une ici.'}
      </p>
      {!filtered && (
        <Button variant="ghost" size="sm" onClick={onAdd}>
          <Plus size={14} />
          Ajouter une tâche
        </Button>
      )}
    </div>
  );
}
