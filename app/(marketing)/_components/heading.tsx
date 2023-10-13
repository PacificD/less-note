'use client'

import { ArrowRight } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { useConvexAuth } from 'convex/react'
import { Spinner } from '@/components/spinner'
import Link from 'next/link'
import { SignInButton } from '@clerk/clerk-react'

const Heading = () => {
  const { isAuthenticated, isLoading } = useConvexAuth()

  return (
    <div className='max-w-3xl space-y-4 text-center'>
      <h1 className='text-3xl sm:text-5xl md:text-6xl font-bold'>
        Your Ideas, Documents, & Plans. Unified. Welcome to &nbsp;
        <span
          className='underline bg-gradient-to-br from-blue-500 via-blue-600 to-gray-700
dark:from-sky-600 dark:via-cyan-400 dark:to-cyan-200
          bg-clip-text text-transparent text-4xl sm:text-5xl md:text-6xl'
        >
          LessNote
        </span>
      </h1>
      <h3 className='text-base sm:text-xl md:text-2xl font-medium'>
        LessNote is the connected workspace where
        <br />
        better, faster work happens.
      </h3>
      {isLoading && (
        <div className='w-full flex items-center justify-center'>
          <Spinner size='lg' />
        </div>
      )}
      {!isLoading && isAuthenticated ? (
        <Button asChild>
          <Link href='/documents'>
            Enter LessNote
            <ArrowRight className='w-4 h-4 ml-2' />
          </Link>
        </Button>
      ) : (
        <SignInButton mode='modal'>
          <Button>
            Get LessNote free
            <ArrowRight className='w-4 h-4 ml-2' />
          </Button>
        </SignInButton>
      )}
    </div>
  )
}

export default Heading
