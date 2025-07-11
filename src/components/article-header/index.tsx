import styles from './article-header.module.css';
import Chip from '@components/chip';
import ResponsiveImage from '@components/responsive-image';

interface ArticleHeaderProps {
  observerRef: React.RefObject<HTMLDivElement>;
  title: string;
  description: string;
  slug: string;
  tags: string[];
  publishedAt: string;
}

export default function ArticleHeader({
  observerRef,
  title,
  description,
  slug,
  tags,
  publishedAt,
}: ArticleHeaderProps) {
  return (
    <div className={styles.layout} ref={observerRef}>
      <section className={styles.info__container}>
        <span className={styles.title}>{title}</span>
        <span className={styles.date}>{publishedAt}</span>
        <span className={styles.description}>{description}</span>
        <div className={styles.tags__container}>
          {tags.map(tag => (
            <Chip key={tag} name={tag} url={`/posts?tags=${tag}`} />
          ))}
        </div>
      </section>

      <section className={styles.thumbnail__container}>
        <ResponsiveImage
          src={`/posts/${slug}/thumbnail-large.jpg`}
          alt="post thumbnail"
          style={{ overflow: 'hidden', borderRadius: '2rem' }}
        />
      </section>
    </div>
  );
}
