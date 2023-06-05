import { UserButton, auth, currentUser } from '@clerk/nextjs'
import { uptime } from 'process'
import { utapi } from 'uploadthing/server'

const fileKeys = ['44cce5d9-07d7-473b-a1f1-d54e90ae3e13_IMG_0227.jpeg']

const getFileUrls = async () => await utapi.getFileUrls(fileKeys)
const deleteFiles = async () => await utapi.deleteFiles(fileKeys)

export default async function Home() {
  const { userId } = auth()
  const user = await currentUser()

  if (!user) return <div>Not logged in</div>

  const res = await deleteFiles()

  console.log('res: ', res)

  return (
    <main className='flex min-h-screen flex-col items-center justify-between p-24'>
      <div className='flex justify-between items-center'>
        <div>User Id: {userId}</div>
        <div>Hello {user?.firstName}</div>
      </div>

      <UserButton afterSignOutUrl='/' />
    </main>
  )
}
