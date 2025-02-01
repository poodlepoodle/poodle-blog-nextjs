import styles from './mobile-row.module.css';

import Link from 'next/link';

import Tag from '@components/tag';

export default function MobileRow({ title, slug, tags, date, updated }) {
  return (
    <Link className={styles.layout} href={`/blog/${slug}`}>
      <div className={styles.top__area}>
        {tags.map((tag) => (
          <Tag key={tag} text={tag} />
        ))}
      </div>

      <div className={styles.bottom__area}>
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
    </Link>
  );
}
