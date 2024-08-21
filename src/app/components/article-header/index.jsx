import styles from './article-header.module.css';

import Tag from '@components/tag';

export default function ArticleHeader({ title, date, tags }) {
  return (
    <section className={styles.layout}>
      <span className={styles.title}>{title}</span>
      <span className={styles.date}>{date}</span>
      <span className={styles.tags}>
        {tags.map((tag) => (
          <Tag key={tag} text={tag} />
        ))}
      </span>
    </section>
  );
}
