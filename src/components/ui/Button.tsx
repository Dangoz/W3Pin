import React from 'react'
import clsx from 'clsx'

interface ButtonProps {
  children: React.ReactNode
  isLoading?: boolean
  isDisabled?: boolean
  size?: 'sm' | 'md' | 'lg'
  shadow?: boolean
  variant?: 'primary' | 'secondary' | 'gradient' | 'ghost'
  width?: number
  height?: number
}

const Button = React.forwardRef<HTMLButtonElement, React.ButtonHTMLAttributes<HTMLButtonElement> & ButtonProps>(
  function Button(
    { children, isDisabled = false, size = 'md', shadow = true, variant = 'primary', className, ...props },
    ref,
  ) {
    return (
      <button
        {...props}
        ref={ref}
        disabled={isDisabled}
        className={clsx(
          className,
          'flex items-center justify-center gap-1',
          'rounded-sm',
          shadow && 'primaryShadow',
          size === 'sm' && 'px-3 py-1 text-sm',
          size === 'md' && 'px-4 py-2 text-base',
          size === 'lg' && 'px-5 py-3 text-lg',
          variant === 'primary' && 'bg-primary hover:bg-primary/80',
          variant === 'secondary' && 'bg-secondary hover:bg-secondary/40',
          variant === 'gradient' &&
            'bg-gradient-to-r from-gradientOne via-gradientTwo to-gradientThree hover:from-gradientOne/80 hover:via-gradientTwo/80 hover:to-gradientThree/80',
        )}
      >
        {children}
      </button>
    )
  },
)

export default Button
