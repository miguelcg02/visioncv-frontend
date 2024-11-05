import type { Metadata } from 'next';
import { Manrope } from 'next/font/google';
import { ClerkProvider, SignInButton, SignedIn, SignedOut, UserButton } from '@clerk/nextjs';

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
    <ClerkProvider>
      <html lang='es' suppressHydrationWarning>
        <body className={manrope.className}>
          <ThemeProvider attribute='class' defaultTheme='dark' enableSystem disableTransitionOnChange>
            <SignedOut>
              <SignInButton />
            </SignedOut>
            <SignedIn>
              <UserButton />
            </SignedIn>
            <MainLayout>{children}</MainLayout>
          </ThemeProvider>
        </body>
      </html>
    </ClerkProvider>
  );
}
