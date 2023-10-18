'use client'
import React, { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import { cn } from '@/lib/utils'

interface IProps extends React.HTMLAttributes<HTMLHeadingElement> {
  words: string
  y?: number
  delay?: number
}

export default function TextStaggeredLetterPullUp({
  words,
  y = 100,
  delay = 0.05,
  className
}: IProps) {
  const [isSSR, setIsSSR] = useState(true)
  const letters = words.split('')
  const pullupVariant = {
    initial: { y, opacity: 0 },
    animate: (i: any) => ({
      y: 0,
      opacity: 1,
      transition: {
        delay: i * delay // Delay each letter's animation by 0.05 seconds
      }
    })
  }

  useEffect(() => {
    setIsSSR(false)
  }, [])

  return (
    !isSSR && (
      <div className='flex justify-center'>
        {letters.map((letter, i) => (
          <motion.h1
            key={i}
            variants={pullupVariant}
            initial='initial'
            animate='animate'
            custom={i}
            className={cn('drop-shadow-sm', className)}
          >
            {letter === ' ' ? <span>&nbsp;</span> : letter}
          </motion.h1>
        ))}
      </div>
    )
  )
}
