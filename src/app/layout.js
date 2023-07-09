import './globals.css';

import TopNav from './components/common/TopNav';
import BottomNav from './components/common/BottomNav';

export const metadata = {
  title: '루트 레이아웃',
  description: '루트 레이아웃입니당',
};

export default function RootLayout({ children }) {
  return (
    <html lang="ko">
      <body>
        <TopNav />

        <div className="content__wrapper">{children}</div>

        <BottomNav />
      </body>
    </html>
  );
}
