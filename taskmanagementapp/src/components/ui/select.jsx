import React from 'react';

export const Select = ({
  options = [],
  value,
  onChange,
  placeholder = 'Select an option',
  disabled = false,
  error,
  className = '',
  ...props
}) => {
  const baseStyles = 'flex h-10 w-full items-center justify-between rounded-md border border-input bg-background px-3 py-2 text-sm';
  const classes = `
    ${baseStyles}
    ${error ? 'border-destructive' : 'focus:border-primary'}
    ${disabled ? 'opacity-50 cursor-not-allowed' : ''}
    placeholder:text-muted-foreground
    focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2
    disabled:cursor-not-allowed disabled:opacity-50
    ${className}
  `;

  return (
    <div className="relative">
      <select
        value={value}
        onChange={onChange}
        disabled={disabled}
        className={classes}
        {...props}
      >
        <option value="" disabled>
          {placeholder}
        </option>
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
      {error && (
        <span className="text-destructive text-sm mt-1 absolute -bottom-6 left-0">
          {error}
        </span>
      )}
    </div>
  );
};