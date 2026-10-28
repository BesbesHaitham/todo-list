import { X } from 'lucide-react';
import styles from './Badge.module.css';
import utilities from '../../styles/atomUtilities.module.css';

/** Status, category or count indicator with optional keyboard-accessible removal. */
export default function Badge({
  variant = 'neutral',
  size = 'md',
  appearance = 'soft',
  radius,
  dot = false,
  startIcon,
  endIcon,
  label,
  onRemove,
  removeLabel = 'Remove badge',
  disabled = false,
  id,
  title,
  ref,
  className,
  children,
  ...props
}) {
  return (
    <span
      {...props}
      ref={ref}
      id={id}
      title={title}
      className={`${styles.base} ${styles[variant] || ''} ${styles[size] || ''} ${styles[appearance] || ''} ${utilities[radius] || ''} ${disabled ? styles.disabled : ''} ${className || ''}`.trim()}
    >
      {dot && <span className={styles.dot} aria-hidden="true" />}
      {startIcon && (
        <span className={styles.icon} aria-hidden="true">
          {startIcon}
        </span>
      )}
      {children ?? label}
      {endIcon && (
        <span className={styles.icon} aria-hidden="true">
          {endIcon}
        </span>
      )}
      {onRemove && (
        <button
          type="button"
          className={styles.remove}
          aria-label={removeLabel}
          title={removeLabel}
          disabled={disabled}
          onClick={onRemove}
        >
          <X size={12} aria-hidden="true" />
        </button>
      )}
    </span>
  );
}
