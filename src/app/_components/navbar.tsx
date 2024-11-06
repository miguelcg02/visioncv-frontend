import { UserButton } from '@clerk/nextjs';
import { auth } from '@clerk/nextjs/server';
import Link from 'next/link';

const Navbar = async () => {
  const { userId } = await auth();

  return (
    <nav className='flex w-full items-center justify-between border-b border-white px-8 py-4'>
      <div className='flex items-center space-x-4'>
        <Link href='/' className='text-xl font-bold'>
          Vision CV
        </Link>
      </div>
      <div className='flex items-center gap-6'>
        {!userId ? (
          <>
            <Link href='/sign-in'>Login</Link>
            <Link href='/sign-up'>Sign Up</Link>
          </>
        ) : (
          <>
            <Link href='/profile'>Profile</Link>
            <li className='flex items-center'>
              <UserButton />
            </li>
          </>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
