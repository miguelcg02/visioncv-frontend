import type { Metadata } from 'next';
import { Manrope } from 'next/font/google';

import { ThemeProvider } from '@/app/_components/theme-provider';

import { MainLayout } from './_components/main-layout';

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
    <html lang='es' suppressHydrationWarning>
      <body className={manrope.className}>
        <ThemeProvider attribute='class' defaultTheme='dark' enableSystem disableTransitionOnChange>
          <MainLayout>{children}</MainLayout>
        </ThemeProvider>
      </body>
    </html>
  );
}
