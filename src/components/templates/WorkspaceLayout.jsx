import { Link } from 'react-router-dom';
import { Check, Moon, Plus, Search, Sun, X } from 'lucide-react';
import brand from '../../assets/brand.svg';
import Button from '../atoms/Button';
import IconButton from '../atoms/IconButton';
import Input from '../atoms/Input';
import styles from './WorkspaceLayout.module.css';

export default function WorkspaceLayout({
  children,
  search,
  onSearch,
  onAdd,
  theme,
  onToggleTheme,
  completed,
  total,
  loaded,
  storageError,
}) {
  return (
    <div className={styles.base}>
      <header className={styles.header}>
        <Link to="/" className={styles.brand} aria-label="Accueil — Mes tâches">
          <img src={brand} width="44" height="44" alt="" />
          <h1>Mes tâches</h1>
        </Link>
        <div className={styles.search}>
          <Search size={20} aria-hidden="true" />
          <label htmlFor="task-search" className="sr-only">
            Rechercher des tâches
          </label>
          <Input
            id="task-search"
            type="search"
            variant="filled"
            placeholder="Rechercher des tâches…"
            value={search}
            onChange={(event) => onSearch(event.target.value)}
          />
          {search && (
            <IconButton label="Effacer la recherche" size="sm" onClick={() => onSearch('')}>
              <X size={16} />
            </IconButton>
          )}
          <kbd>/</kbd>
        </div>
        <div className={styles.headerActions}>
          <IconButton
            label={`Passer au thème ${theme === 'light' ? 'sombre' : 'clair'}`}
            onClick={onToggleTheme}
          >
            {theme === 'light' ? <Moon size={20} /> : <Sun size={20} />}
          </IconButton>
          <Button onClick={onAdd} disabled={!loaded} aria-label="Ajouter une tâche">
            <Plus size={20} />
            Ajouter
          </Button>
        </div>
      </header>
      <main id="main-content" className={styles.main}>
        {children}
      </main>
      <footer className={styles.footer}>
        <span>
          <span className={styles.statusDot} />
          {!loaded
            ? 'Préparation de votre espace…'
            : storageError
              ? 'Stockage indisponible · modifications conservées pour cette session'
              : 'Enregistré sur cet appareil'}
        </span>
        <span className={styles.tip}>Glissez pour organiser vos tâches.</span>
        <span className={styles.progress}>
          <Check size={14} />
          {completed} sur {total} terminée{completed > 1 ? 's' : ''}
          <div className={styles.track}>
            <div style={{ width: `${total ? (completed / total) * 100 : 0}%` }} />
          </div>
        </span>
      </footer>
    </div>
  );
}
