import { TextToSpeechProvider } from '@/context/TextToSpeechProvider';
import { CVDataProvider } from '@/context/CVDataProvider';

import Navbar from './navbar';

export const MainLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <TextToSpeechProvider>
      <CVDataProvider>
        <main className='flex min-h-screen flex-col text-white'>
          <Navbar />
          <section className='min-h-screen-minus-nav'>{children}</section>
        </main>
      </CVDataProvider>
    </TextToSpeechProvider>
  );
};
