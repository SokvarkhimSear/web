import React from 'react';

export const Button = ({
  children,
  onClick,
  variant = 'primary',
  disabled = false,
  className = ''
}: {
  children: React.ReactNode;
  onClick?: () => void;
  variant?: 'primary' | 'secondary' | 'outline';
  disabled?: boolean;
  className?: string;
}) => {
  const baseStyles = "px-4 py-2 text-xs font-bold rounded flex items-center justify-center gap-2 focus:outline-none transition-colors select-none";
  const variants = {
    primary: "bg-accent-blue text-white shadow-lg shadow-accent-blue/20 hover:bg-accent-teal disabled:opacity-50",
    secondary: "bg-gray-800 text-white border border-border-dark hover:bg-gray-700 disabled:opacity-50",
    outline: "border border-border-dark text-gray-300 hover:text-white hover:bg-gray-800 disabled:opacity-50"
  };

  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className={`${baseStyles} ${variants[variant]} ${className}`}
    >
      {children}
    </button>
  );
};

export const Card = ({ children, className = '' }: { children: React.ReactNode; className?: string }) => {
  return (
    <div className={`border border-border-dark bg-sidebar rounded p-4 ${className}`}>
      {children}
    </div>
  );
}
