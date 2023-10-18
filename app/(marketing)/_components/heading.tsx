'use client'

import { ArrowRight, RotateCw } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { useConvexAuth } from 'convex/react'
import Link from 'next/link'
import { SignInButton } from '@clerk/clerk-react'
import { TextStaggeredLetterPullUp, FadeIn } from '@/components/motion-variants'

const GettingStarted = () => {
  const { isAuthenticated, isLoading } = useConvexAuth()

  return (
    <FadeIn blur={8}>
      <Button disabled={isLoading} asChild={!isLoading}>
        {isLoading ? (
          <>
            <RotateCw className='mr-2 h-4 w-4 animate-spin' />
            Please wait
          </>
        ) : isAuthenticated ? (
          <Link href='/documents'>
            Enter LessNote
            <ArrowRight className='w-4 h-4 ml-2' />
          </Link>
        ) : (
          <SignInButton mode='modal'>
            <Button>
              Get LessNote free
              <ArrowRight className='w-4 h-4 ml-2' />
            </Button>
          </SignInButton>
        )}
      </Button>
    </FadeIn>
  )
}

const Heading = () => {
  return (
    <div className='max-w-3xl space-y-4 text-center'>
      <h1 className='text-3xl sm:text-5xl md:text-6xl font-bold'>
        <FadeIn>
          Your Ideas, Documents, & Plans. Unified. Welcome to &nbsp;
        </FadeIn>
        <TextStaggeredLetterPullUp
          className='underline bg-gradient-to-br from-blue-500 via-blue-600 to-gray-700
          dark:from-sky-600 dark:via-cyan-400 dark:to-cyan-200
          bg-clip-text text-transparent text-4xl sm:text-5xl md:text-6xl'
          words='LessNote'
          delay={0.1}
          y={50}
        />
      </h1>
      <FadeIn
        as='h3'
        duration={1.2}
        className='text-base sm:text-xl md:text-2xl font-medium'
      >
        LessNote is the connected workspace where
        <br />
        better, faster work happens.
      </FadeIn>
      <GettingStarted />
    </div>
  )
}

export default Heading
