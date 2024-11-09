import styles from './large.module.css';

import Image from 'next/image';
import Link from 'next/link';

export default function Large({ title, slug, date, updated }) {
  return (
    <Link href={`/blog/${slug}`}>
      <div className={styles.layout}>
        <div className={styles.container}>
          <div className={styles.thumbnail__container}>
            <Image
              src={`/blog/posts/${slug}/thumbnail-large.jpg`}
              alt="post thumbnail large"
              fill
            />
          </div>

          <span className={styles.date}>{date}</span>
          <div className={styles.title}>
            {updated && (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 6 6"
                fill="none"
              >
                <circle cx="3" cy="3" r="3" fill="#5FD0FF" />
              </svg>
            )}
            <span>{title}</span>
          </div>
        </div>
      </div>
    </Link>
  );
}
