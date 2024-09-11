'use client';

import Link from 'next/link';
import { useWindowSize } from 'react-use';
import Confetti from 'react-confetti';
import { useEffect, useState, useRef } from 'react';

import { Button } from '@/components/ui/button';
import { useTextToSpeechContext } from '@/context/TextToSpeechProvider';

const SuccessStage = () => {
  const { width, height } = useWindowSize();
  const [isClient, setIsClient] = useState(false);
  const spokenRef = useRef(false);

  const { speak } = useTextToSpeechContext();

  useEffect(() => {
    setIsClient(true);
    if (!spokenRef.current) {
      speak(`¡Felicitaciones, haz creado tu hoja de vida con VisionCB! 
        Nuestra misión es acompañarte en este proceso y es por ello que 
        estaremos trabajando en continuar mejorando desde VisionCB 
        para brindarte la mejor experiencia.`);
      spokenRef.current = true;
    }
  }, [speak]);

  return (
    <div className='flex w-full flex-col'>
      {isClient && (
        <Confetti
          width={width}
          height={height}
          numberOfPieces={500}
          colors={['#293829', '#9EB89E', '#1AB21A', '#FFFFFF']}
          recycle={false}
        />
      )}
      <div className='min-h flex min-h-screen-minus-nav flex-col items-center justify-center gap-12 p-12 text-center md:p-24'>
        <div className='flex flex-col gap-6'>
          <div>
            <h1 className='text-5xl font-bold'>¡Felicitaciones, haz creado tu hoja de vida con VisionCV!</h1>
          </div>
          <p className='text-xl font-medium'>
            Nuestra misión es acompañarte en este proceso y es por ello que estaremos trabajando en continuar mejorando
            desde VisionCV para brindarte la mejor experiencia.
          </p>
        </div>

        <div className='w-full'>
          <Link href='/'>
            <Button className='w-1/2 font-bold'>Volver al Home</Button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default SuccessStage;
