import { UserButton, auth, currentUser } from '@clerk/nextjs'

export default async function Home() {
  const { userId } = auth()
  const user = await currentUser()

  if (!user) return <div>Not logged in</div>

  return (
    <main className='flex min-h-screen flex-col items-center justify-between p-24'>
      <div>User Id: {userId}</div>
      <div>Hello {user?.firstName}</div>
      <div>
        <UserButton afterSignOutUrl='/' />
      </div>
    </main>
  )
}
