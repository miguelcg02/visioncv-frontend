import type { Metadata } from 'next';
import { Manrope } from 'next/font/google';
import { ClerkProvider, ClerkLoaded } from '@clerk/nextjs';
import { dark } from '@clerk/themes';
import { esES } from '@clerk/localizations';

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
    <ClerkProvider
      localization={esES}
      appearance={{
        baseTheme: dark,
        variables: { colorPrimary: '#19e619', colorBackground: '#161d16', colorInputBackground: '#121712' },
      }}
    >
      <html lang='es' suppressHydrationWarning>
        <body className={manrope.className}>
          <ThemeProvider attribute='class' defaultTheme='dark' enableSystem disableTransitionOnChange>
            <ClerkLoaded>
              <MainLayout>{children}</MainLayout>
            </ClerkLoaded>
          </ThemeProvider>
        </body>
      </html>
    </ClerkProvider>
  );
}
