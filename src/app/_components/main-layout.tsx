import { TextToSpeechProvider } from '@/context/TextToSpeechProvider';

import Navbar from './navbar';

export const MainLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <TextToSpeechProvider>
      <main className='flex min-h-screen flex-col text-white'>
        <Navbar />
        <section className='h-full'>{children}</section>
      </main>
    </TextToSpeechProvider>
  );
};
