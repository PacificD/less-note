import Image from 'next/image'

const Heroes = () => {
  return (
    <div className='flex flex-col items-center justify-center max-w-5xl'>
      <div className='flex items-center'>
        <div className='relative w-[300px] h-[300px] sm:w-[350px] sm:h-[350px] md:w-[400px] md:h-[400px]'>
          <Image
            className='object-contain dark:hidden'
            alt='Documents'
            src='/documents.png'
            fill
          />
          <Image
            className='object-contain hidden dark:block'
            alt='Documents'
            src='/documents-dark.png'
            fill
          />
        </div>
        <div className='relative h-[400px] w-[400px] hidden md:block'>
          <Image
            src='/reading.png'
            fill
            className='object-contain dark:hidden'
            alt='Reading'
          />
          <Image
            src='/reading.png'
            fill
            className='object-contain hidden dark:block'
            alt='Reading'
          />
        </div>
      </div>
    </div>
  )
}

export default Heroes
