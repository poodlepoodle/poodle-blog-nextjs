import styles from './styles.module.css';

import { getPosts } from '@/lib/get-posts';
import ArticleList from '@components/article-list';
import Banner from '@components/banner';
import Button from '@components/button';

export default async function Page() {
  const posts = await getPosts();
  const sortedPosts = posts.sort((a, b) => new Date(b.date) - new Date(a.date));

  return (
    <section className={styles.layout}>
      <div className={styles.container}>
        <Banner
          href={`/about`}
          src={`/blog/banner.jpg`}
          text={`새로운 기술이 파도처럼 몰려와도 지워지지 않을 개발자국을 남깁니다.`}
        />

        <ArticleList posts={sortedPosts} />

        <div className={styles.centered__row}>
          <Button href={`/blog`} label="더 보기" />
        </div>
      </div>
    </section>
  );
}
