import type { Metadata } from 'next';

import './globals.css';
import HeaderAnchor from '@components/header-anchor';
import Header from '@components/header';
import Footer from '@components/footer';
import ImageModal from '@components/image-modal';
import { Analytics } from '@vercel/analytics/react';
import { BlogContextProvider } from '@contexts/BlogContext';
import { generateCommonMetadata } from '@utils/generate-metadata';

export const metadata: Metadata = generateCommonMetadata({
  title: '푸들 블로그',
  description:
    '애정을 담아 사용자와 인터랙션하고 싶은 프론트엔드 개발자 최어진입니다.',
});

interface RootLayoutProps {
  children: React.ReactNode;
}

export default function RootLayout({ children }: RootLayoutProps) {
  return (
    <html lang="ko">
      <body>
        <BlogContextProvider>
          <HeaderAnchor /> {/* for Responsive Header */}
          <Header />
          <main className="content__wrapper">{children}</main>
          <ImageModal />
        </BlogContextProvider>
        <Footer />
        <Analytics /> {/* for Vercel Analytics */}
      </body>
    </html>
  );
}
