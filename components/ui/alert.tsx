import * as React from 'react';
import { cn } from '@/lib/utils';

export type AlertProps = React.HTMLAttributes<HTMLDivElement> & {
  variant?: 'default' | 'destructive' | 'success';
  role?: React.AriaRole;
  'aria-live'?: 'polite' | 'assertive' | 'off';
};

export const Alert = React.forwardRef<HTMLDivElement, AlertProps>(
  ({ className, variant = 'default', role = 'status', ...props }, ref) => {
    const classes = cn(
      'rounded-md border p-3 text-sm',
      variant === 'default' && 'border-gray-300 bg-gray-50 text-gray-900',
      variant === 'destructive' && 'border-red-300 bg-red-50 text-red-800',
      variant === 'success' && 'border-green-300 bg-green-50 text-green-900',
      className
    );
    return <div ref={ref} role={role} {...props} className={classes} />;
  }
);
Alert.displayName = 'Alert';
