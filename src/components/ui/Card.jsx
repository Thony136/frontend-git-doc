import { clsx } from 'clsx';

const Card = ({ 
  children, 
  className, 
  variant = 'default',
  hover = false,
  ...props 
}) => {
  const baseStyles = 'bg-white rounded-xl border border-gray-200 shadow-sm';
  
  const variants = {
    default: 'p-6',
    compact: 'p-4',
    large: 'p-8',
  };

  const hoverStyles = hover ? 'card-hover cursor-pointer' : '';

  return (
    <div
      className={clsx(
        baseStyles,
        variants[variant],
        hoverStyles,
        className
      )}
      {...props}
    >
      {children}
    </div>
  );
};

export default Card;