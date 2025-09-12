import React from 'react'

interface Props {
  className?: string
  children: React.ReactNode
}

const Container: React.FC<Props> = ({ className = '', children }) => {
  return (
    <div className={[
      'mx-auto w-full',
      'max-w-7xl',
      'px-4 sm:px-6 lg:px-8',
      className
    ].join(' ')}>
      {children}
    </div>
  )
}

export default Container
