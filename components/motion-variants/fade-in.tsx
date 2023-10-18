'use clinet'

import { CustomDomComponent, motion, Variants } from 'framer-motion'
import React, { ReactHTML } from 'react'

interface IProps extends React.PropsWithChildren {
  blur?: number
  duration?: number
  variants?: Variants
  as?: keyof ReactHTML
  className?: string
}

const FadeIn = ({
  as = 'div',
  duration = 1,
  blur = 0,
  variants,
  className,
  children
}: IProps) => {
  const defaultVariants = {
    hidden: { filter: blur ? `blur(${blur}px)` : 'blur(0px)', opacity: 0 },
    visible: { filter: 'blur(0px)', opacity: 1 }
  }
  const Motion: CustomDomComponent<{ className: string | undefined }> =
    motion(as)

  return (
    <Motion
      initial='hidden'
      animate='visible'
      transition={{ duration }}
      variants={{
        ...defaultVariants,
        ...variants
      }}
      className={className}
    >
      {children}
    </Motion>
  )
}

export default FadeIn
