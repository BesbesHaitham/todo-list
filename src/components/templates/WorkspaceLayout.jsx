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
        <Link to="/" className={styles.brand} aria-label="Todo List home">
          <img src={brand} width="44" height="44" alt="" />
          <h1>Todo List</h1>
        </Link>
        <div className={styles.search}>
          <Search size={20} aria-hidden="true" />
          <label htmlFor="task-search" className="sr-only">
            Search tasks
          </label>
          <Input
            id="task-search"
            type="search"
            variant="filled"
            placeholder="Search tasks…"
            value={search}
            onChange={(event) => onSearch(event.target.value)}
          />
          {search && (
            <IconButton label="Clear search" size="sm" onClick={() => onSearch('')}>
              <X size={16} />
            </IconButton>
          )}
          <kbd>/</kbd>
        </div>
        <div className={styles.headerActions}>
          <IconButton
            label={`Switch to ${theme === 'light' ? 'dark' : 'light'} theme`}
            onClick={onToggleTheme}
          >
            {theme === 'light' ? <Moon size={20} /> : <Sun size={20} />}
          </IconButton>
          <Button onClick={onAdd} disabled={!loaded}>
            <Plus size={20} />
            Add Task
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
            ? 'Getting your workspace ready…'
            : storageError
              ? 'Browser storage unavailable · changes last for this session'
              : 'Saved on this device'}
        </span>
        <span className={styles.tip}>Drag to organize. Make space for what matters.</span>
        <span className={styles.progress}>
          <Check size={14} />
          {completed} of {total} complete
          <div className={styles.track}>
            <div style={{ width: `${total ? (completed / total) * 100 : 0}%` }} />
          </div>
        </span>
      </footer>
    </div>
  );
}
