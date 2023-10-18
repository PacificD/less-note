'use client'
import { CustomDomComponent, motion, Variant } from 'framer-motion'
import React, { ReactHTML } from 'react'

interface IProps extends React.PropsWithChildren {
  blur?: number
  duration?: number
  hiddenVariant?: Variant
  visibleVariant?: Variant
  as?: keyof ReactHTML
  className?: string
}

const FadeIn = ({
  as = 'div',
  duration = 1,
  blur = 0,
  hiddenVariant,
  visibleVariant,
  className,
  children
}: IProps) => {
  const motionVariants = {
    hidden: {
      filter: blur ? `blur(${blur}px)` : 'blur(0px)',
      opacity: 0,
      ...hiddenVariant
    },
    visible: { filter: 'blur(0px)', opacity: 1, ...visibleVariant }
  }
  const Motion: CustomDomComponent<{ className: string | undefined }> =
    motion(as)

  return (
    <Motion
      initial='hidden'
      animate='visible'
      transition={{ duration }}
      variants={motionVariants}
      className={className}
    >
      {children}
    </Motion>
  )
}

export default FadeIn
