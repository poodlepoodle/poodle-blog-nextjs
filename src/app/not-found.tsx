import type { Metadata } from 'next';

import styles from './not-found.module.css';
import Link from 'next/link';
import Button from '@components/button';

export const metadata: Metadata = {
  title: '존재하지 않는 페이지 ••• poodlepoodle',
  description:
    '새로운 기술이 파도처럼 몰려와도 지워지지 않을 개발자국을 남깁니다.',
};

export default async function Page() {
  return (
    <section className={styles.layout}>
      <div className={styles.container}>
        <h1>404 NOT FOUND</h1>
        <span>페이지를 찾을 수 없습니다.</span>

        <div className={styles.button_container}>
          <Button href="/" label="홈으로 이동하기" replace={true} />
        </div>
      </div>
    </section>
  );
}
