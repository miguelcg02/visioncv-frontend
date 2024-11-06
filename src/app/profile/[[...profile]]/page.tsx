import React from 'react';
import Link from 'next/link';
import { redirect } from 'next/navigation';
import { UserProfile } from '@clerk/nextjs';
import { auth, currentUser } from '@clerk/nextjs/server';

import { Button } from '@/components/ui/button';

const Profile = async () => {
  const { userId } = await auth();
  const isAuth = !!userId;
  const user = await currentUser();

  if (!isAuth) {
    redirect('/');
  }

  return (
    <div className='mt-8 flex flex-col items-center justify-center'>
      <h1 className='my-2 text-2xl font-bold'>{user?.fullName}</h1>
      <UserProfile />
      <Link href='/' className='my-2'>
        <Button type='button' variant='outline' aria-label='Botón para regresar a la homepage'>
          Volver
        </Button>
      </Link>
    </div>
  );
};

export default Profile;
