import styles from './styles.module.css';

import { getPosts } from '@/lib/get-posts';
import Search from '@components/search';
// import ThumbnailRow from '@components/thumbnail/row';
import ThumbnailBox from '@components/thumbnail/box';

export default async function Page() {
  const posts = await getPosts();
  const sortedPosts = posts.sort((a, b) => new Date(b.date) - new Date(a.date));

  return (
    <section className={styles.layout}>
      <div className={styles.container}>
        <div className={styles.centered__row}>
          <Search />
        </div>

        <ThumbnailBox posts={sortedPosts} />
      </div>
    </section>
  );
}
