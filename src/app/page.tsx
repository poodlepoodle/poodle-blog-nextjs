import styles from './styles.module.css';
import PostGrid from '@components/post-grid';
import Banner from '@components/banner';
import Button from '@components/button';
import { getPosts } from '@utils/get-posts';

export default async function Page() {
  const posts = await getPosts();

  return (
    <div className={styles.layout}>
      <div className={styles.container}>
        <Banner />
        <PostGrid posts={posts} />
        <div className={styles.row}>
          <Button href={`/posts`} label="더 보기" />
        </div>
      </div>
    </div>
  );
}
