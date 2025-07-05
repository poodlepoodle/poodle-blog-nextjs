import type { Metadata } from 'next';

import styles from './not-found.module.css';
import Button from '@components/button';
import { generateCommonMetadata } from '@utils/generate-metadata';

export const metadata: Metadata = generateCommonMetadata({
  title: '존재하지 않는 페이지 ••• 푸들 블로그',
  description:
    '애정을 담아 사용자와 인터랙션하고 싶은 프론트엔드 개발자 최어진입니다.',
});

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
