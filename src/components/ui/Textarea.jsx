import { forwardRef } from 'react';
import { clsx } from 'clsx';

const Textarea = forwardRef(({ 
  className, 
  error,
  label,
  placeholder,
  rows = 4,
  ...props 
}, ref) => {
  const baseStyles = 'block w-full rounded-lg border border-gray-300 px-3 py-2 text-sm placeholder-gray-500 transition-colors focus:border-primary-500 focus:outline-none focus:ring-1 focus:ring-primary-500 disabled:bg-gray-50 disabled:text-gray-500 resize-none';
  
  const errorStyles = error ? 'border-red-500 focus:border-red-500 focus:ring-red-500' : '';

  return (
    <div className="space-y-1">
      {label && (
        <label className="block text-sm font-medium text-gray-700">
          {label}
        </label>
      )}
      <textarea
        rows={rows}
        className={clsx(baseStyles, errorStyles, className)}
        ref={ref}
        placeholder={placeholder}
        {...props}
      />
      {error && (
        <p className="text-sm text-red-600">{error}</p>
      )}
    </div>
  );
});

Textarea.displayName = 'Textarea';

export default Textarea;