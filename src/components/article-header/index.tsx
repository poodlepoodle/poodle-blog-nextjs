import styles from './article-header.module.css';
import Chip from '@components/chip';
import ResponsiveImage from '@components/responsive-image';

interface ArticleHeaderProps {
  observerRef: React.RefObject<HTMLDivElement>;
  title: string;
  description?: string;
  slug: string;
  tags?: string[];
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
  const isBlogPost = !!description;
  const postPath = isBlogPost ? 'posts' : 'playground';

  return (
    <div className={styles.layout} ref={observerRef}>
      <section className={styles.info__container}>
        <span className={styles.title}>{title}</span>
        <span className={styles.date}>{publishedAt}</span>
        {description && (
          <span className={styles.description}>{description}</span>
        )}
        {tags && tags.length > 0 && (
          <div className={styles.tags__container}>
            {tags.map(tag => (
              <Chip key={tag} name={tag} url={`/posts?tags=${tag}`} />
            ))}
          </div>
        )}
      </section>

      <section className={styles.thumbnail__container}>
        <ResponsiveImage
          src={`/${postPath}/${slug}/thumbnail-large.jpg`}
          alt="post thumbnail"
          style={{ overflow: 'hidden', borderRadius: '1rem' }}
        />
      </section>
    </div>
  );
}
