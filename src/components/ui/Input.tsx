import { InputHTMLAttributes } from 'react';

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  type?: string;
  required?: boolean;
  label?: string;
  placeholder?: string;
  error?: string;
  className?: string;
}

export default function Input({
  className = '',
  required,
  label,
  placeholder,
  error,
  ...props
}: InputProps) {
  const baseClasses =
    'border border-gray-300 rounded-md p-2 mb-2 w-full placeholder:text-gray-500';

  const classes = `${baseClasses} ${className}`;

  return (
    <>
      {label && (
        <label className='text-gray-500'>
          {required ? `${label} *` : label}
        </label>
      )}
      <input className={classes} {...props} placeholder={placeholder} />
      {error && <p className='text-red-500'>{error}</p>}
    </>
  );
}
