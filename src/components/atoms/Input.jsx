import styles from './Input.module.css';
import utilities from '../../styles/atomUtilities.module.css';

/** A native input, textarea or select. Use value/onChange OR defaultValue. */
export default function Input({
  as: Component = 'input',
  variant = 'default',
  size = 'md',
  radius,
  fullWidth = true,
  invalid = false,
  resize,
  htmlSize,
  options,
  type = 'text',
  id,
  name,
  value,
  defaultValue,
  placeholder,
  disabled = false,
  readOnly = false,
  required = false,
  autoFocus = false,
  autoComplete,
  onChange,
  onFocus,
  onBlur,
  ref,
  className,
  style,
  children,
  ...props
}) {
  const content =
    children ??
    (Component === 'select' && options
      ? options.map((option) => (
          <option key={option.value} value={option.value} disabled={option.disabled}>
            {option.label}
          </option>
        ))
      : undefined);
  return (
    <Component
      {...props}
      ref={ref}
      id={id}
      name={name}
      type={Component === 'input' ? type : undefined}
      value={value}
      defaultValue={defaultValue}
      placeholder={placeholder}
      disabled={disabled}
      readOnly={Component === 'select' ? undefined : readOnly}
      required={required}
      autoFocus={autoFocus}
      autoComplete={autoComplete}
      size={Component === 'textarea' ? undefined : htmlSize}
      onChange={onChange}
      onFocus={onFocus}
      onBlur={onBlur}
      aria-invalid={invalid || props['aria-invalid']}
      className={`${styles.base} ${styles[variant] || ''} ${styles[size] || ''} ${utilities[radius] || ''} ${fullWidth ? utilities.fullWidth : ''} ${className || ''}`.trim()}
      style={{ ...style, ...(Component === 'textarea' && resize ? { resize } : {}) }}
      children={Component === 'input' ? undefined : content}
    />
  );
}
