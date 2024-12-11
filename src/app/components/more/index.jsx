import styles from './more.module.css';

import Link from 'next/link';

export default function More() {
  return (
    <Link href="/blog">
      <div className={styles.layout}>
        <span>더 보기</span>
      </div>
    </Link>
  );
}
