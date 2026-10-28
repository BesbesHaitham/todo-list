import Button from './Button';
import styles from './IconButton.module.css';

export default function IconButton({
  label,
  icon,
  variant = 'ghost',
  size = 'md',
  radius,
  loading = false,
  loadingLabel,
  disabled = false,
  pressed,
  type = 'button',
  title = label,
  onClick,
  ref,
  className,
  children,
  ...props
}) {
  return (
    <Button
      {...props}
      ref={ref}
      type={type}
      variant={variant}
      size={size}
      radius={radius}
      loading={loading}
      disabled={disabled}
      onClick={onClick}
      className={`${styles.base} ${styles[size] || ''} ${className || ''}`.trim()}
      aria-label={(loading && loadingLabel) || label || props['aria-label']}
      aria-pressed={pressed ?? props['aria-pressed']}
      title={title}
    >
      {children ?? icon}
    </Button>
  );
}
