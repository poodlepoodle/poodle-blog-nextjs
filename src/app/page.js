import styles from './styles.module.css';

import Image from 'next/image';
import Link from 'next/link';

import { getPosts } from '@/lib/get-posts';
import ArticleList from '@components/article-list';
import More from '@components/more';

export default async function Page() {
  const posts = await getPosts();
  const sortedPosts = posts.sort((a, b) => new Date(b.date) - new Date(a.date));

  return (
    <section className={styles.layout}>
      <div className={styles.container}>
        <Link href="/about" className={styles.banner__container}>
          <Image
            src="/blog/banner.jpg"
            alt="banner image in blog home"
            fill
            style={{ objectFit: 'cover', borderRadius: '0.5rem' }}
          />
          <span className={styles.banner__text}>
            새로운 기술이 파도처럼 몰려와도 지워지지 않을 개발자국을 남깁니다.
          </span>
        </Link>

        <ArticleList posts={sortedPosts} />

        <div className={styles.centered__row}>
          <More />
        </div>
      </div>
    </section>
  );
}
