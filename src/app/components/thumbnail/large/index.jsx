import styles from './large.module.css';

import Image from 'next/image';
import Link from 'next/link';

export default function Large(props) {
  return (
    <Link href="/blog/sample-post">
      <div className={styles.layout}>
        <div className={styles.container}>
          <div className={styles.thumbnail__container}>
            <Image src={props.src} fill alt="post thumbnail large" />
          </div>

          <span className={styles.date}>2000.00.00</span>

          <span className={styles.title}>글 제목</span>
        </div>
      </div>
    </Link>
  );
}
