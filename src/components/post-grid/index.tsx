import { Post } from '@utils/types';

import styles from './post-grid.module.css';
import PostGridItem from '@components/post-grid-item';

export default function PostGrid({ posts }: { posts: Post[] }) {
  return (
    <div className={styles.grid}>
      {posts.map((post, index) => (
        <PostGridItem
          key={post.slug}
          post={post}
          className={`${index === 0 ? styles.grid_item_large : ''}`}
        />
      ))}
    </div>
  );
}
