import './globals.css';

import Header from '@components/header';
import Footer from '@components/footer';

export const metadata = {
  title: '루트 레이아웃',
  description: '루트 레이아웃입니당',
};

export default function RootLayout({ children }) {
  return (
    <html lang="ko">
      <body>
        <Header />
        <div className="content__wrapper">{children}</div>
        <Footer />
      </body>
    </html>
  );
}
