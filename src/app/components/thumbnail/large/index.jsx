import styles from './large.module.css';

import Image from 'next/image';
import Link from 'next/link';

export default function Large({ title, slug, thumbnail, date }) {
  return (
    <div className={styles.layout}>
      <div className={styles.container}>
        <Link href={`/blog/${slug}`}>
          <div className={styles.thumbnail__container}>
            <Image src={thumbnail} fill alt="post thumbnail large" />
          </div>
        </Link>

        <span className={styles.date}>{date}</span>

        <span className={styles.title}>
          <Link href={`/blog/${slug}`}>{title}</Link>
        </span>
      </div>
    </div>
  );
}
