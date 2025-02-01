import styles from './styles.module.css';

import ArticleList from '@components/article-list';
import Banner from '@components/banner';
import Button from '@components/button';
import Row from '@components/layout/row';

import { getSortedPosts } from '@lib/get-posts';

export default async function Page() {
  const posts = await getSortedPosts();

  return (
    <div className={styles.layout}>
      <div className={styles.container}>
        <Banner
          href={`/about`}
          src={`/blog/banner.jpg`}
          text={`새로운 기술이 파도처럼 몰려와도 지워지지 않을 개발자국을 남깁니다.`}
        />

        <ArticleList posts={posts} />

        <Row>
          <Button href={`/blog`} label="더 보기" />
        </Row>
      </div>
    </div>
  );
}
