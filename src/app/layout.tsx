import type { Metadata } from 'next';
import { Manrope } from 'next/font/google';

import { ThemeProvider } from '@/components/theme-provider';

import './globals.css';

const manrope = Manrope({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'VisionCV',
  description: 'Platform for creating and sharing your CV with accessiblity features',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang='es'>
      <body className={manrope.className}>
        <ThemeProvider attribute='class' defaultTheme='dark' enableSystem disableTransitionOnChange>
          <div className='text-white'>{children}</div>
        </ThemeProvider>
      </body>
    </html>
  );
}
