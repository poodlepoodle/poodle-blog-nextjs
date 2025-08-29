import type { Metadata } from 'next';

import styles from './not-found.module.css';
import Button from '@components/button';

import { METADATA_PRESET } from '@constants/metadata';

export const metadata: Metadata = {
  ...METADATA_PRESET,
  title: '존재하지 않는 페이지 ••• 푸들 블로그',
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
