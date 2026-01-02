'use client';

import * as React from 'react';
import { forwardRef } from 'react';
import Link from 'next/link';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '@/lib/utils';

const buttonVariants = cva(
  [
    'inline-flex items-center justify-center gap-2',
    'font-medium rounded-lg whitespace-nowrap',
    'transition-all duration-300',
    'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-background',
    'disabled:pointer-events-none disabled:opacity-50',
  ],
  {
    variants: {
      variant: {
        default: [
          'bg-accent text-white',
          'hover:bg-accent-hover',
          'shadow-glow-sm hover:shadow-glow-md',
        ],
        outline: [
          'border-2 border-border bg-transparent',
          'text-foreground',
          'hover:border-accent hover:bg-accent/5',
        ],
        ghost: [
          'bg-transparent',
          'text-foreground-secondary',
          'hover:text-foreground hover:bg-surface-hover',
        ],
        link: [
          'text-accent underline-offset-4',
          'hover:underline',
        ],
        glow: [
          'bg-accent text-white',
          'hover:bg-accent-hover',
          'shadow-glow-md hover:shadow-glow-md',
          'border border-accent-hover',
        ],
      },
      size: {
        default: 'h-12 px-6 py-3 text-base',
        sm: 'h-10 px-4 py-2 text-sm',
        lg: 'h-14 px-8 py-4 text-lg',
        icon: 'h-12 w-12',
      },
    },
    defaultVariants: {
      variant: 'default',
      size: 'default',
    },
  }
);

interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  href?: string;
  isLoading?: boolean;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
}

/**
 * Premium Button component with multiple variants and sizes
 * Supports both button and link modes
 */
export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      className,
      variant,
      size,
      href,
      isLoading,
      leftIcon,
      rightIcon,
      children,
      disabled,
      ...props
    },
    ref
  ) => {
    const content = (
      <>
        {isLoading ? (
          <span className="animate-spin h-4 w-4 border-2 border-current border-t-transparent rounded-full" />
        ) : (
          leftIcon
        )}
        {children}
        {rightIcon}
      </>
    );

    if (href && !disabled) {
      return (
        <Link 
          href={href} 
          className={cn(buttonVariants({ variant, size, className }))}
        >
          {content}
        </Link>
      );
    }

    return (
      <button
        ref={ref}
        className={cn(buttonVariants({ variant, size, className }))}
        disabled={disabled || isLoading}
        {...props}
      >
        {content}
      </button>
    );
  }
);

Button.displayName = 'Button';

export { buttonVariants };
