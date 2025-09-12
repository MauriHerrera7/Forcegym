'use client'

import React from 'react'
import { Button as FBButton } from 'flowbite-react'

type ButtonVariant = 'primary' | 'secondary' | 'outline' | 'secondarySolid'
type ButtonSize = 'sm' | 'md' | 'lg'

interface ButtonProps {
  children: React.ReactNode
  variant?: ButtonVariant
  size?: ButtonSize
  onClick?: () => void
  className?: string
  disabled?: boolean
}

const sizeMap: Record<ButtonSize, 'xs' | 'sm' | 'md' | 'lg' | 'xl'> = {
  sm: 'sm',
  md: 'md',
  lg: 'lg'
}

// Extra padding per size to avoid cramped text and match screenshot proportions
const paddingBySize: Record<ButtonSize, string> = {
  sm: 'px-3 py-2',
  md: 'px-4 py-2.5',
  lg: 'px-5 py-3'
}

const Button: React.FC<ButtonProps> = ({
  children,
  variant = 'primary',
  size = 'lg',
  onClick,
  className = '',
  disabled = false
}) => {
  // Square corners and brand styles using Tailwind + Flowbite
  const base = [
    'inline-flex items-center justify-center gap-2 align-middle',
    'rounded-lg select-none font-medium tracking-normal leading-normal antialiased whitespace-nowrap',
    'disabled:opacity-50 disabled:cursor-not-allowed'
  ].join(' ')

  // Ensure readable text sizes per size
  const textSizeBySize: Record<ButtonSize, string> = {
    sm: 'text-sm',
    md: 'text-base',
    lg: 'text-lg'
  }

  type FBColor = 'info' | 'gray' | 'failure' | 'success' | 'warning' | 'purple' | 'pink' | 'blue' | 'green' | 'red' | 'yellow' | 'light' | 'dark';
  const variants: Record<ButtonVariant, { className: string; color?: FBColor; outline?: boolean }> = {
    primary: {
      // Explicit solid red background to avoid transparency (override Flowbite defaults)
      className: 'shadow-sm !bg-red-600 hover:!bg-red-700 active:!bg-red-800 !text-white',
      color: 'failure'
    },
    secondary: {
      className: 'text-white border border-white/60 bg-white/10 backdrop-blur-sm hover:bg-white hover:text-black hover:border-black/80'
    },
    outline: {
      // Visible red outline with subtle hover fill (override with !important)
      className: '!bg-transparent !border-2 !border-red-500 !text-red-500 hover:!bg-red-600 hover:!text-white',
      color: 'failure',
      outline: true
    },
    secondarySolid: {
      // Solid but slightly less intense than primary
      className: '!bg-red-500 hover:!bg-red-600 active:!bg-red-700 !text-white',
      color: 'failure'
    }
  }

  return (
    <FBButton
      onClick={onClick}
      disabled={disabled}
      size={sizeMap[size]}
      color={variants[variant].color}
      outline={variants[variant].outline}
  className={[base, paddingBySize[size], textSizeBySize[size], variants[variant].className, className].join(' ')}
    >
      {children}
    </FBButton>
  )
}

export default Button