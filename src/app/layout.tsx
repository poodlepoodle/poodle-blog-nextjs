import type { Metadata } from 'next';

import './globals.css';
import localFont from 'next/font/local';
import { HeaderAnchor } from '@components/header-anchor';
import { Header } from '@components/header';
import { Drawer } from '@components/drawer';
import { Footer } from '@components/footer';
import { Analytics } from '@vercel/analytics/react';
import { BASE_URL, METADATA_PRESET } from '@constants/metadata';
import { cn } from '@utils/cn';

const pretendard = localFont({
  src: './../../public/fonts/PretendardVariable.woff2',
  display: 'swap',
  weight: '45 920',
  variable: '--font-pretendard',
});

export const metadata: Metadata = {
  ...METADATA_PRESET,
  metadataBase: new URL(BASE_URL),
  verification: {
    google: 'VCbUAJ2UDsWls7Vx-L5EvgHo9KG4dnVlgGurUZRaqRA',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ko" className={cn(pretendard.variable, 'antialiased')}>
      <body className="relative z-base bg-background font-prtd">
        <HeaderAnchor />
        <Header />
        <Drawer />
        <main className="relative flex min-h-page w-full flex-col items-center pt-header">
          {children}
        </main>
        <Footer />
        <Analytics />
      </body>
    </html>
  );
}
