import * as React from 'react';
import { cn } from 'lib/utils';

interface CheckboxProps extends React.InputHTMLAttributes<HTMLInputElement> {}

const Checkbox = React.forwardRef<HTMLInputElement, CheckboxProps>(
  ({ className, ...props }, ref) => {
    return (
      <div className="flex gap-2">
        <input
          type="checkbox"
          className={cn(
            'peer relative mt-1 h-4 w-4 shrink-0 appearance-none rounded-sm border-2 bg-gray-300 checked:border-0 checked:bg-secondary',
            className,
          )}
          ref={ref}
          {...props}
        />
        <svg
          className="
            pointer-events-none
            absolute mt-1 hidden
            h-4 w-4
            peer-checked:block"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="4"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <polyline points="20 6 9 17 4 12"></polyline>
        </svg>
      </div>
    );
  },
);
Checkbox.displayName = 'Checkbox';

export { Checkbox };
