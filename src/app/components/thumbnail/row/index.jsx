import styles from './row.module.css';

import Image from 'next/image';
import Link from 'next/link';

import Tag from '@components/tag';

export default function Row({ title, slug, tags, thumbnail, date }) {
  return (
    <Link href={`/blog/${slug}`}>
      <div className={styles.layout}>
        <div className={styles.content__container}>
          <div className={styles.top__area}>
            {tags.map((tag) => (
              <Tag key={tag} text={tag} />
            ))}
          </div>

          <div className={styles.bottom__area}>
            <span className={styles.date}>{date}</span>

            <span className={styles.title}>{title}</span>
          </div>
        </div>

        <div className={styles.thumbnail__container}>
          <Image src={thumbnail} fill alt="post thumbnail" />
        </div>
      </div>
    </Link>
  );
}
