import styles from './normal.module.css';

import Link from 'next/link';
import Image from 'next/image';

export default function Normal({ src }) {
  return (
    <Link href="/blog/sample-post">
      <div className={styles.layout}>
        <div className={styles.container}>
          <div className={styles.thumbnail__container}>
            <Image src={src} fill alt="post thumbnail" />
          </div>

          <span className={styles.date}>2000.00.00</span>

          <span className={styles.title}>글 제목</span>
        </div>
      </div>
    </Link>
  );
}
