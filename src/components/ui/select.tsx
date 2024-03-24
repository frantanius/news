import * as React from 'react';
import { cn } from 'lib/utils';

interface SelectProps extends React.SelectHTMLAttributes<HTMLSelectElement> {}

const Select = React.forwardRef<HTMLSelectElement, SelectProps>(
  ({ className, children, ...props }, ref) => {
    return (
      <select
        className={cn(
          'h-10 w-full rounded border border-slate-500 bg-transparent px-3 py-2 text-sm text-slate-300 focus:border-slate-600 focus:outline-none',
          className,
        )}
        ref={ref}
        {...props}
      >
        {children}
      </select>
    );
  },
);
Select.displayName = 'Select';

export { Select };
