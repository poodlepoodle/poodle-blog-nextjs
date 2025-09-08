import type { Metadata } from 'next';

import './globals.css';
import localFont from 'next/font/local';
import HeaderAnchor from '@components/header-anchor';
import Header from '@components/header';
import Footer from '@components/footer';
import ImageModal from '@components/image-modal';
import { Analytics } from '@vercel/analytics/react';
import { BASE_URL, METADATA_PRESET } from '@constants/metadata';

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

interface RootLayoutProps {
  children: React.ReactNode;
}

export default function RootLayout({ children }: RootLayoutProps) {
  return (
    <html lang="ko" className={`${pretendard.variable}`}>
      <body className="font-prtd">
        <HeaderAnchor /> {/* for Responsive Header */}
        <Header />
        <main className="content__wrapper">{children}</main>
        <ImageModal />
        <Footer />
        <Analytics /> {/* for Vercel Analytics */}
      </body>
    </html>
  );
}
