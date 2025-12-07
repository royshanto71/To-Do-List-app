import './Button.css';

export default function Button({
  children,
  variant = 'primary',
  size = 'md',
  type = 'button',
  disabled = false,
  loading = false,
  fullWidth = false,
  icon: Icon,
  iconPosition = 'left',
  onClick,
  className = '',
  ...props
}) {
  const classes = [
    'btn',
    `btn-${variant}`,
    `btn-${size}`,
    fullWidth && 'btn-full',
    loading && 'btn-loading',
    className,
  ].filter(Boolean).join(' ');

  return (
    <button
      type={type}
      className={classes}
      disabled={disabled || loading}
      onClick={onClick}
      {...props}
    >
      {loading && (
        <span className="btn-spinner" />
      )}
      {!loading && Icon && iconPosition === 'left' && (
        <Icon size={size === 'sm' ? 14 : size === 'lg' ? 20 : 16} />
      )}
      {children && <span>{children}</span>}
      {!loading && Icon && iconPosition === 'right' && (
        <Icon size={size === 'sm' ? 14 : size === 'lg' ? 20 : 16} />
      )}
    </button>
  );
}
