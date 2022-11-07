import React from 'react'
import clsx from 'clsx'

interface ButtonProps {
  children: React.ReactNode
  isDisabled?: boolean
  size: 'sm' | 'md' | 'lg'
}

const Button = React.forwardRef<HTMLButtonElement, React.ButtonHTMLAttributes<HTMLButtonElement> & ButtonProps>(
  function Button({ children, isDisabled, size, ...props }, ref) {
    return (
      <button {...props} ref={ref} disabled={isDisabled} className={clsx()}>
        {children}
      </button>
    )
  },
)

export default Button
