import styles from './row.module.css';

import Image from 'next/image';
import Link from 'next/link';

import Tag from '@components/tag';

export default function Row(props) {
  return (
    <Link href="/blog/sample-post">
      <div className={styles.layout}>
        <div className={styles.content__container}>
          <div className={styles.top__area}>
            <Tag text="Next.js" />
            <Tag text="최적화" />
          </div>

          <div className={styles.bottom__area}>
            <span className={styles.date}>2000.00.00</span>

            <span className={styles.title}>글 제목</span>
          </div>
        </div>

        <div className={styles.thumbnail__container}>
          <Image src={props.src} fill alt="post thumbnail" />
        </div>
      </div>
    </Link>
  );
}
