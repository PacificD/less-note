'use client'

import { cn } from '@/lib/utils'
import {
  ChevronsLeft,
  MenuIcon,
  PlusCircle,
  Search,
  Settings
} from 'lucide-react'
import { usePathname } from 'next/navigation'
import React, { ElementRef, useEffect, useRef, useState } from 'react'
import { useMediaQuery } from 'usehooks-ts'
import UserItem from './user-item'
import { useMutation, useQuery } from 'convex/react'
import { api } from '@/convex/_generated/api'
import Item from './item'
import {
  CREATE_DOCUMENT_DEFAULT_ARGS,
  CREATE_DOCUMENT_DEFAULT_SONNER
} from '@/constants/documents'
import { toast } from 'sonner'

const Navigation = () => {
  const pathname = usePathname()
  const isMobie = useMediaQuery('(max-width: 768px)')
  const documents = useQuery(api.documents.get)
  const create = useMutation(api.documents.create)

  const isReszingRef = useRef(false)
  const sidebarRef = useRef<ElementRef<'aside'>>(null)
  const navbarRef = useRef<ElementRef<'div'>>(null)
  const [isResetting, setIsResetting] = useState(false)
  const [isCollapsed, setIsCollapsed] = useState(isMobie)

  const handleCreate = () => {
    const promise = create(CREATE_DOCUMENT_DEFAULT_ARGS)
    toast.promise(promise, CREATE_DOCUMENT_DEFAULT_SONNER)
  }

  const handleMouseMove = (e: MouseEvent) => {
    if (!isReszingRef.current) return
    let newWidth = e.clientX
    if (newWidth < 240) newWidth = 240
    if (newWidth > 480) newWidth = 480
    if (sidebarRef.current && navbarRef.current) {
      sidebarRef.current.style.width = `${newWidth}px`
      navbarRef.current.style.setProperty('left', `${newWidth}px`)
      navbarRef.current.style.setProperty('width', `calc(100%-${newWidth}px)`)
    }
  }

  const handleMouseUp = () => {
    isReszingRef.current = false
    document.removeEventListener('mousemove', handleMouseMove)
    document.removeEventListener('mouseup', handleMouseUp)
  }

  const handleMouseDown = (
    event: React.MouseEvent<HTMLDivElement, MouseEvent>
  ) => {
    event.preventDefault()
    event.stopPropagation()
    isReszingRef.current = true
    document.addEventListener('mousemove', handleMouseMove)
    document.addEventListener('mouseup', handleMouseUp)
  }

  const resetWidth = () => {
    if (sidebarRef.current && navbarRef.current) {
      setIsCollapsed(false)
      setIsResetting(true)
      sidebarRef.current.style.width = isMobie ? '100%' : '240px'
      navbarRef.current.style.setProperty(
        'width',
        isMobie ? '0' : 'calc(100%-240px)'
      )
      navbarRef.current.style.setProperty('left', isMobie ? '100%' : '240px')
      setTimeout(() => setIsResetting(false), 300)
    }
  }

  const collapse = () => {
    if (sidebarRef.current && navbarRef.current) {
      setIsResetting(true)
      setIsCollapsed(true)
      sidebarRef.current.style.width = '0'
      navbarRef.current.style.setProperty('width', '100%')
      navbarRef.current.style.setProperty('left', '0')
      setTimeout(() => setIsResetting(false), 300)
    }
  }

  useEffect(() => {
    if (isMobie) collapse()
    else resetWidth()
  }, [isMobie])

  useEffect(() => {
    if (isMobie) collapse()
  }, [pathname, isMobie])

  return (
    <>
      <aside
        ref={sidebarRef}
        className={cn(
          'group/sidebar h-full bg-secondary overflow-y-auto relative flex w-60 flex-col z-[99999]',
          isResetting && 'transition-all ease-in-out duration-300',
          isMobie && 'w-0'
        )}
      >
        <div
          role='button'
          onClick={collapse}
          className={cn(
            'h-6 w-6 text-muted-foreground rounded-sm hover:bg-neutral-300 dark:hover:bg-neutral-600 absolute top-3 right-2 opacity-0 group-hover/sidebar:opacity-100 transition',
            isMobie && 'opacity-100'
          )}
        >
          <ChevronsLeft className='h-6 w-6' />
        </div>

        <div>
          <UserItem />
          <Item onClick={() => {}} isSearch label='Search' icon={Search} />
          <Item onClick={() => {}} label='Settings' icon={Settings} />
          <Item onClick={handleCreate} label='New page' icon={PlusCircle} />
        </div>
        <div className='mt-4'>
          {documents?.map(document => (
            <p key={document._id}>{document.title}</p>
          ))}
        </div>
        <div
          onMouseDown={handleMouseDown}
          onClick={resetWidth}
          className='opacity-0 group-hover/sidebar:opacity-100 transition cursor-ew-resize absolute h-full w-1 bg-primary/10 right-0 top-0'
        />
      </aside>
      <div
        ref={navbarRef}
        className={cn(
          'absolute top-0 z-[99999] left-60 w-[calc(100%-240px)]',
          isResetting && 'transition-all ease-in-out duration-300',
          isMobie && 'left-0 w-full'
        )}
      >
        <nav className='bg-transparent px-3 py-2 w-full'>
          {isCollapsed && (
            <MenuIcon
              onClick={resetWidth}
              className='h-6 w-6 text-muted-foreground'
              role='button'
            />
          )}
        </nav>
      </div>
    </>
  )
}

export default Navigation
