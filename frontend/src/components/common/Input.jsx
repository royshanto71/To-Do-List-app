import { forwardRef } from 'react';
import './Input.css';

const Input = forwardRef(({
  label,
  type = 'text',
  error,
  hint,
  icon: Icon,
  fullWidth = true,
  className = '',
  ...props
}, ref) => {
  const wrapperClasses = [
    'input-wrapper',
    fullWidth && 'input-full',
    error && 'input-error',
    className,
  ].filter(Boolean).join(' ');

  return (
    <div className={wrapperClasses}>
      {label && (
        <label className="input-label" htmlFor={props.id || props.name}>
          {label}
        </label>
      )}
      <div className="input-container">
        {Icon && (
          <span className="input-icon">
            <Icon size={18} />
          </span>
        )}
        {type === 'textarea' ? (
          <textarea
            ref={ref}
            className={`input input-textarea ${Icon ? 'input-with-icon' : ''}`}
            {...props}
          />
        ) : (
          <input
            ref={ref}
            type={type}
            className={`input ${Icon ? 'input-with-icon' : ''}`}
            {...props}
          />
        )}
      </div>
      {error && <span className="input-error-text">{error}</span>}
      {hint && !error && <span className="input-hint">{hint}</span>}
    </div>
  );
});

Input.displayName = 'Input';

export default Input;
