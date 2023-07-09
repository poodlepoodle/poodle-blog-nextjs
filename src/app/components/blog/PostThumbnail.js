import styles from './postthumbnail.module.css';

import Link from 'next/link';
import Image from 'next/image';

export default function PostThumbnail(props) {
  return (
    <Link href="/blog/sample-post">
      <div className={styles.layout}>
        <div className={styles.container}>
          <div className={styles.thumbnail__container}>
            <Image src={props.src} fill alt="post thumbnail" />
          </div>

          <span className={styles.date}>2000.00.00</span>

          <span className={styles.title}>글 제목</span>
        </div>
      </div>
    </Link>
  );
}
