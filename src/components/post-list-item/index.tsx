import styles from './post-list-item.module.css';
import Chip from '@components/chip';
import Icon from '@components/icon';
import ResponsiveImage from '@components/responsive-image';
import Link from 'next/link';

const UpdatedIcon = () => {
  return (
    <Icon width={5} height={5} color="var(--color-skyblue)">
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 6 6" fill="none">
        <circle cx="3" cy="3" r="3" fill="#5FD0FF" />
      </svg>
    </Icon>
  );
};

type PostListItemProps = {
  post: {
    title: string;
    description: string;
    slug: string;
    tags: string[];
    publishedAt: string;
    updated: boolean;
  };
};

export default function PostListItem({ post }: PostListItemProps) {
  const { title, description, slug, tags, publishedAt, updated } = post;
  return (
    <Link className={styles.layout} href={`/posts/${slug}`}>
      <div className={styles.content__container}>
        <div className={styles.top_container}>
          {tags.map(name => (
            <Chip key={name} name={name} />
          ))}
        </div>

        <div className={styles.bottom_container}>
          <span className={styles.date}>{publishedAt}</span>
          <div className={styles.title}>
            {updated && <UpdatedIcon />}
            <span>{title}</span>
          </div>
          <span className={styles.description}>{description}</span>
        </div>
      </div>

      <div className={styles.thumbnail__container}>
        <ResponsiveImage
          src={`/posts/${slug}/thumbnail.jpg`}
          alt="post thumbnail"
        />
      </div>
    </Link>
  );
}
