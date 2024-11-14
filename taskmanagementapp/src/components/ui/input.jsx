import React from 'react';

export const Input = ({
  type = 'text',
  placeholder,
  value,
  onChange,
  disabled = false,
  error,
  className = '',
  ...props
}) => {
  const baseStyles = 'flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm';
  const classes = `
    ${baseStyles}
    ${error ? 'border-destructive' : 'focus:border-primary'}
    ${disabled ? 'opacity-50 cursor-not-allowed' : ''}
    file:border-0 file:bg-transparent file:text-sm file:font-medium
    placeholder:text-muted-foreground
    focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2
    disabled:cursor-not-allowed disabled:opacity-50
    ${className}
  `;

  return (
    <div className="relative">
      <input
        type={type}
        value={value}
        onChange={onChange}
        disabled={disabled}
        placeholder={placeholder}
        className={classes}
        {...props}
      />
      {error && (
        <span className="text-destructive text-sm mt-1 absolute -bottom-6 left-0">
          {error}
        </span>
      )}
    </div>
  );
};