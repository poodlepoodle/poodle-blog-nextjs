import styles from './normal.module.css';

import Image from 'next/image';
import Link from 'next/link';

export default function Normal({ title, slug, thumbnail, date }) {
  return (
    <Link href={`/blog/${slug}`}>
      <div className={styles.layout}>
        <div className={styles.container}>
          <div className={styles.thumbnail__container}>
            <Image
              src={`/blog/posts/${slug}/thumbnail.jpg`}
              alt="post thumbnail"
              fill
            />
          </div>

          <span className={styles.date}>{date}</span>
          <span className={styles.title}>{title}</span>
        </div>
      </div>
    </Link>
  );
}
