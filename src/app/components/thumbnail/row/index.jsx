import styles from './row.module.css';

import Image from 'next/image';
import Link from 'next/link';

import Tag from '@components/tag';

export default function Row({ title, description, slug, tags, date }) {
  return (
    <Link className={styles.layout} href={`/blog/${slug}`}>
      <div className={styles.content__container}>
        <div className={styles.top__area}>
          {tags.map((tag) => (
            <Tag key={tag} text={tag} />
          ))}
        </div>

        <div className={styles.bottom__area}>
          <span className={styles.date}>{date}</span>

          <span className={styles.title}>{title}</span>

          <span className={styles.description}>{description}</span>
        </div>
      </div>

      <div className={styles.thumbnail__container}>
        <Image
          src={`/blog/posts/${slug}/thumbnail.jpg`}
          alt="post thumbnail"
          fill
          style={{ objectFit: 'cover', borderRadius: '0.5rem' }}
        />
      </div>
    </Link>
  );
}
