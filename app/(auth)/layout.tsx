import { currentUser } from '@clerk/nextjs/server'
import { redirect } from 'next/navigation'
import Image from 'next/image'
import Link from 'next/link'

const Layout = async ({ children }: {
  children: React.ReactNode
}) => {
  const user = await currentUser()
  if (user) redirect('/')

  return (
    <div className='min-h-screen flex w-full justify-center bg-primary'>
      <div className='w-full lg:w-[55%] flex flex-col items-center justify-between gap-4 p-4 bg-white lg:rounded-r-3xl lg:gap-0'>
        <Link href='/' className='mr-auto'>
          <Image
            src='/logo.svg'
            alt='Logo'
            width={100}
            height={0}
          />
        </Link>
        {children}
        <div className='h-[30px] lg:h-[62px]'></div>
      </div>
      <div className='w-full max-h-full hidden lg:flex flex-col flex-1 justify-center gap-4 p-8 text-white bg-waves-pattern'>
        <h2 className='text-6xl font-bold leading-tight'>
          Don’t Just Plan It, CEVVER It!
        </h2>
        <p className='text-lg'>
          Bring the fun back into event planning! Discover amazing vendors, connect with ease, and create your dream event.
        </p>
      </div>
    </div>
  )
}

export default Layout