import styles from './article-header.module.css';
import Image from 'next/image';
import Chip from '@components/chip';

export default function ArticleHeader({
  observerRef,
  title,
  description,
  slug,
  tags,
  publishedAt,
}: {
  observerRef: React.RefObject<HTMLDivElement>;
  title: string;
  description: string;
  slug: string;
  tags: string[];
  publishedAt: string;
}) {
  return (
    <div className={styles.layout} ref={observerRef}>
      <section className={styles.info__container}>
        <span className={styles.title}>{title}</span>
        <span className={styles.date}>{publishedAt}</span>
        <span className={styles.description}>{description}</span>
        <div className={styles.tags__container}>
          {tags.map(tag => (
            <Chip key={tag} name={tag} />
          ))}
        </div>
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
