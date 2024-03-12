import styles from './styles.module.css';

import Image from 'next/image';

import { getPosts } from '@/lib/get-posts';
import More from '@components/more';
import ThumbnailNormal from '@components/thumbnail/normal';
import ThumbnailLarge from '@components/thumbnail/large';

export default async function Page() {
  const posts = await getPosts();
  const sortedPosts = posts.sort((a, b) => new Date(b.date) - new Date(a.date));
  const upperPosts = sortedPosts.slice(0, 2);
  const lowerPosts = sortedPosts.slice(2, 5);

  return (
    <section className={styles.layout}>
      <div className={styles.container}>
        <div className={styles.banner__container}>
          <Image
            src="/blog/banner.jpg"
            fill
            style={{ objectFit: 'cover', borderRadius: '0.5rem' }}
            alt="banner image in blog home"
          />
          <span className={styles.banner__text}>
            🌊 새로운 기술이 파도처럼 몰려와도 지워지지 않을 개발자국을
            남깁니다.
          </span>
        </div>

        <div className={styles.postrow__upper}>
          {upperPosts.map(({ title, slug, thumbnail, date }, idx) => {
            if (idx === 0) {
              return (
                <ThumbnailLarge
                  key={slug}
                  title={title}
                  slug={slug}
                  thumbnail={thumbnail}
                  date={date}
                />
              );
            } else {
              return (
                <ThumbnailNormal
                  key={slug}
                  title={title}
                  slug={slug}
                  thumbnail={thumbnail}
                  date={date}
                />
              );
            }
          })}
        </div>

        <div className={styles.postrow__lower}>
          {lowerPosts.map(({ title, slug, thumbnail, date }) => {
            return (
              <ThumbnailNormal
                key={slug}
                title={title}
                slug={slug}
                thumbnail={thumbnail}
                date={date}
              />
            );
          })}
        </div>

        <div className={styles.centered__row}>
          <More />
        </div>
      </div>
    </section>
  );
}
