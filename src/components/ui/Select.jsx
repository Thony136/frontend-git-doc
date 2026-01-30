import { forwardRef } from 'react';
import { clsx } from 'clsx';
import { ChevronDown } from 'lucide-react';

const Select = forwardRef(({ 
  className, 
  children,
  error,
  label,
  placeholder,
  ...props 
}, ref) => {
  const baseStyles = 'block w-full rounded-lg border border-gray-300 bg-white px-3 py-2 pr-10 text-sm transition-colors focus:border-primary-500 focus:outline-none focus:ring-1 focus:ring-primary-500 disabled:bg-gray-50 disabled:text-gray-500 appearance-none';
  
  const errorStyles = error ? 'border-red-500 focus:border-red-500 focus:ring-red-500' : '';

  return (
    <div className="space-y-1">
      {label && (
        <label className="block text-sm font-medium text-gray-700">
          {label}
        </label>
      )}
      <div className="relative">
        <select
          className={clsx(baseStyles, errorStyles, className)}
          ref={ref}
          {...props}
        >
          {placeholder && (
            <option value="" disabled>
              {placeholder}
            </option>
          )}
          {children}
        </select>
        <ChevronDown className="absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400 pointer-events-none" />
      </div>
      {error && (
        <p className="text-sm text-red-600">{error}</p>
      )}
    </div>
  );
});

Select.displayName = 'Select';

export default Select;