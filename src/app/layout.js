import './globals.css';

import { Analytics } from '@vercel/analytics/react';
import { BlogContextProvider } from '@/contexts/BlogContext';

import HeaderAnchor from '@components/header/anchor';
import Header from '@components/header';
import Footer from '@components/footer';

export const metadata = {
  title: 'Home ••• poodlepoodle',
  description:
    '새로운 기술이 파도처럼 몰려와도 지워지지 않을 개발자국을 남깁니다.',
};

export default function RootLayout({ children }) {
  return (
    <html lang="ko">
      <body>
        <BlogContextProvider>
          <HeaderAnchor />
          <Header />
          <main className="content__wrapper">{children}</main>
        </BlogContextProvider>
        <Footer />
        <Analytics />
      </body>
    </html>
  );
}
