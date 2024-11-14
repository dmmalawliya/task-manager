import React from 'react';

export const Button = ({ 
  children, 
  variant = 'default', 
  size = 'default', 
  disabled = false,
  type = 'button',
  className = '',
  onClick 
}) => {
  const baseStyles = 'inline-flex items-center justify-center rounded-md font-medium transition-colors';
  
  const variants = {
    default: 'bg-primary text-primary-foreground hover:bg-primary/90',
    secondary: 'bg-secondary text-secondary-foreground hover:bg-secondary/80',
    destructive: 'bg-destructive text-destructive-foreground hover:bg-destructive/90',
    outline: 'border border-input bg-background hover:bg-accent hover:text-accent-foreground',
    ghost: 'hover:bg-accent hover:text-accent-foreground',
    link: 'text-primary underline-offset-4 hover:underline'
  };

  const sizes = {
    default: 'h-10 px-4 py-2',
    sm: 'h-9 rounded-md px-3',
    lg: 'h-11 rounded-md px-8',
    icon: 'h-10 w-10'
  };

  const classes = `
    ${baseStyles}
    ${variants[variant]}
    ${sizes[size]}
    ${disabled ? 'opacity-50 cursor-not-allowed' : ''}
    ${className}
  `;

  return (
    <button
      type={type}
      disabled={disabled}
      className={classes}
      onClick={onClick}
    >
      {children}
    </button>
  );
};