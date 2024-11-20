import { UserButton } from '@clerk/nextjs';
import { auth } from '@clerk/nextjs/server';
import Link from 'next/link';

const Navbar = async () => {
  const { userId } = await auth();

  return (
    <nav className='flex w-full items-center justify-between border-b border-white px-8 py-4'>
      <div className='flex items-center space-x-4'>
        <Link href='/' className='text-xl font-bold' aria-label='VisionCB'>
          Vision CV
        </Link>
        {userId && (
          <Link href='/cv/all' aria-label={'Mis CBs'}>
            Mis CV&apos;s
          </Link>
        )}
      </div>
      <div className='flex items-center gap-6'>
        {!userId ? (
          <>
            <Link href='/sign-in'>Iniciar Sesión</Link>
            <Link href='/sign-up'>Registrarme</Link>
          </>
        ) : (
          <>
            <Link href='/profile'>Perfil</Link>
            <li className='flex items-center'>
              <UserButton showName={true} />
            </li>
          </>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
