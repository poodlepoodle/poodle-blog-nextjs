import './globals.css';
import HeaderAnchor from '@components/header/anchor';
import Header from '@components/header';
import Footer from '@components/footer';
import { Analytics } from '@vercel/analytics/react';
import { BlogContextProvider } from '@contexts/BlogContext';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Home ••• poodlepoodle',
  description:
    '새로운 기술이 파도처럼 몰려와도 지워지지 않을 개발자국을 남깁니다.',
};

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
        </BlogContextProvider>
        <Footer />
        <Analytics /> {/* for Vercel Analytics */}
      </body>
    </html>
  );
}
