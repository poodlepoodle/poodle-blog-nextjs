import type { Metadata } from 'next';

import styles from './styles.module.css';

export const metadata: Metadata = {
  title: 'About ••• poodlepoodle',
  description:
    '새로운 기술이 파도처럼 몰려와도 지워지지 않을 개발자국을 남깁니다.',
};

export default async function Page() {
  return (
    <section className={styles.layout}>
      <div className={styles.container}>
        <span>수정 중입니다...</span>
      </div>
    </section>
  );
}
