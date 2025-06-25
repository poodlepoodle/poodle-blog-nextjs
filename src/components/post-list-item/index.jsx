import styles from './post-list-item.module.css';
import Image from 'next/image';
import Link from 'next/link';
import Chip from '@components/chip';

export default function PostListItem({ post }) {
  const { title, description, slug, tags, publishedAt, updated } = post;
  return (
    <Link className={styles.layout} href={`/posts/${slug}`}>
      <div className={styles.content__container}>
        <div className={styles.top__area}>
          {tags.map(name => (
            <Chip key={name} name={name} />
          ))}
        </div>

        <div className={styles.bottom__area}>
          <span className={styles.date}>{publishedAt}</span>

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
