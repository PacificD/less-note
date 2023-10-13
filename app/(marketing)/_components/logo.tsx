import Image from 'next/image'
import { Poppins } from 'next/font/google'
import { cn } from '@/lib/utils'

const font = Poppins({
  subsets: ['latin'],
  weight: ['400', '600']
})

interface IProps {
  hiddenOnMobile?: boolean
}

const Logo = ({ hiddenOnMobile = true }: IProps) => {
  return (
    <div
      className={cn(
        'items-center gap-x-2',
        hiddenOnMobile ? 'hidden md:flex' : 'flex'
      )}
    >
      <Image
        className='dark:hidden'
        src='/logo.svg'
        height='40'
        width='40'
        alt='logo'
      />
      <Image
        className='hidden dark:block'
        src='/logo-dark.svg'
        height='40'
        width='40'
        alt='logo'
      />
      <p className={cn('font-semibold', font.className)}>LessNote</p>
    </div>
  )
}

export default Logo
