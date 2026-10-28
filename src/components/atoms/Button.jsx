import styles from './Button.module.css';
import utilities from '../../styles/atomUtilities.module.css';

/** Native button attributes, events, aria-*, data-* and ref are forwarded. */
export default function Button({
  variant = 'primary',
  size = 'md',
  radius,
  fullWidth = false,
  loading = false,
  loadingLabel,
  startIcon,
  endIcon,
  label,
  disabled = false,
  className,
  type = 'button',
  id,
  name,
  value,
  title,
  autoFocus = false,
  onClick,
  onFocus,
  onBlur,
  ref,
  children,
  ...props
}) {
  return (
    <button
      {...props}
      ref={ref}
      id={id}
      name={name}
      value={value}
      title={title}
      type={type}
      disabled={disabled || loading}
      autoFocus={autoFocus}
      onClick={onClick}
      onFocus={onFocus}
      onBlur={onBlur}
      aria-busy={loading || props['aria-busy']}
      className={`${styles.base} ${styles[variant] || ''} ${styles[size] || ''} ${utilities[radius] || ''} ${fullWidth ? utilities.fullWidth : ''} ${loading ? styles.loading : ''} ${loading && loadingLabel ? styles.loadingWithLabel : ''} ${className || ''}`.trim()}
    >
      {loading && <span className={styles.spinner} aria-hidden="true" />}
      <span
        className={`${styles.content} ${loading && !loadingLabel ? styles.hiddenContent : ''}`.trim()}
      >
        {startIcon && (
          <span className={styles.icon} aria-hidden="true">
            {startIcon}
          </span>
        )}
        {loading && loadingLabel ? loadingLabel : (children ?? label)}
        {endIcon && (
          <span className={styles.icon} aria-hidden="true">
            {endIcon}
          </span>
        )}
      </span>
    </button>
  );
}
