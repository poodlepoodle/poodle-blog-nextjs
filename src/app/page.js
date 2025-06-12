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
          text={`애정을 담아 사용자와 인터랙션하고 싶은 프론트엔드 개발자 최어진입니다.`}
        />

        <ArticleList posts={posts} />

        <Row>
          <Button href={`/blog`} label="더 보기" />
        </Row>
      </div>
    </div>
  );
}
