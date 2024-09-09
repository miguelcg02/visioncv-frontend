import Navbar from './navbar';

export const MainLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <main className='flex min-h-screen flex-col text-white'>
      <Navbar />
      <section className='h-full'>{children}</section>
    </main>
  );
};
