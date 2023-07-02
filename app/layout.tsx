import React from 'react'
import { currentUser, ClerkProvider } from '@clerk/nextjs'
import { Inter } from 'next/font/google'
import './globals.css'
import { Header } from '@components'

const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: 'Less Uploadthing',
  description: 'Personal image/media uploading service, powered by uploadthing.'
}

export default async function RootLayout({
  children
}: {
  children: React.ReactNode
}) {
  // const { userId } = auth()
  const user = await currentUser()

  return (
    <ClerkProvider>
      <html lang='en'>
        <body className={inter.className}>
          <div className='flex max-w-6xl mx-auto flex-col items-center justify-center py-2 min-h-screen bg-[conic-gradient(at_bottom_right,_var(--tw-gradient-stops))] from-[#0f0c29] via-[#302b63] to-[#112] text-white'>
            {user ? (
              <>
                <Header />
                {children}
              </>
            ) : (
              <div>Not logged in</div>
            )}
          </div>
        </body>
      </html>
    </ClerkProvider>
  )
}
