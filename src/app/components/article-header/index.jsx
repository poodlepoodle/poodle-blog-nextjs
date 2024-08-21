import styles from './article-header.module.css';

import Image from 'next/image';
import Tag from '@components/tag';

export default function ArticleHeader({
  observerRef,
  title,
  date,
  tags,
  slug,
}) {
  return (
    <div ref={observerRef}>
      <section className={styles.info__container}>
        <span className={styles.title}>{title}</span>
        <span className={styles.date}>{date}</span>
        <span className={styles.tags}>
          {tags.map((tag) => (
            <Tag key={tag} text={tag} />
          ))}
        </span>
      </section>

      <section className={styles.thumbnail__container}>
        <Image
          src={`/blog/posts/${slug}/thumbnail-large.jpg`}
          alt="post thumbnail"
          fill
          style={{ objectFit: 'cover', borderRadius: '0.5rem' }}
        />
      </section>
    </div>
  );
}
