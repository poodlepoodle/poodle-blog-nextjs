import styles from './styles.module.css';

import Search from '@/app/components/common/SearchBar';
import PostThumbnailListItem from '@/app/components/blog/PostThumbnailListItem';

export default function Page() {
  return (
    <section className={styles.layout}>
      <div className={styles.container}>
        <div className={styles.centered__row}>
          <Search />
        </div>

        <div className={styles.content}>
          <PostThumbnailListItem src="/blog/1.png" />
          <PostThumbnailListItem src="/blog/2.png" />
          <PostThumbnailListItem src="/blog/1.png" />
          <PostThumbnailListItem src="/blog/2.png" />
          <PostThumbnailListItem src="/blog/1.png" />
        </div>
      </div>
    </section>
  );
}
