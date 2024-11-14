import React from 'react';

export const Label = ({
  children,
  htmlFor,
  required,
  className = ''
}) => {
  const baseStyles = 'text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70';
  
  return (
    <label
      htmlFor={htmlFor}
      className={`${baseStyles} ${className}`}
    >
      {children}
      {required && <span className="text-destructive ml-1">*</span>}
    </label>
  );
};
