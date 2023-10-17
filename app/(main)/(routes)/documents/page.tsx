'use client'

import { Button } from '@/components/ui/button'
import {
  CREATE_DOCUMENT_DEFAULT_ARGS,
  CREATE_DOCUMENT_DEFAULT_SONNER
} from '@/constants/documents'
import { api } from '@/convex/_generated/api'
import { useUser } from '@clerk/clerk-react'
import { useMutation } from 'convex/react'
import { PlusCircle } from 'lucide-react'
import Image from 'next/image'
import { toast } from 'sonner'

const DocumentPage = () => {
  const { user } = useUser()
  const create = useMutation(api.documents.create)

  const onCreate = () => {
    const promise = create(CREATE_DOCUMENT_DEFAULT_ARGS)
    toast.promise(promise, CREATE_DOCUMENT_DEFAULT_SONNER)
  }

  return (
    <div className='h-full flex flex-col items-center justify-center space-y-4'>
      <Image
        src='/empty.png'
        height='300'
        width='300'
        alt='empty'
        className='dark:hidden'
      />
      <Image
        src='/empty-dark.png'
        height='300'
        width='300'
        alt='empty'
        className='dark:block hidden'
      />
      <h2 className='text-lg font-medium'>
        Welcome to {user?.username}&apos;s LessNote
      </h2>
      <Button onClick={onCreate}>
        <PlusCircle className='h-4 w-4 mr-2' />
        Create a note
      </Button>
    </div>
  )
}

export default DocumentPage
