import Link from 'next/link';

import { Button } from '@/components/ui/button';

export default function Home() {
  return (
    <div className='min-h flex min-h-screen-minus-nav flex-col items-center justify-center gap-12 p-12 text-center md:p-24'>
      <div className='flex flex-col gap-6'>
        <div>
          <h1 className='text-5xl font-bold'>¡Hola!</h1>
          <h1 className='text-5xl font-bold'>Bienvenido a tu entrevista de trabajo</h1>
        </div>
        <p className='text-xl font-medium'>
          Te daremos instrucciones claras y te guiaremos en cada paso. No te preocupes, ¡estamos aquí para ayudarte!
        </p>
      </div>

      <div className='w-full'>
        <Link href='/interview'>
          <Button className='w-1/2 font-bold'>Comenzar</Button>
        </Link>
      </div>
    </div>
  );
}
