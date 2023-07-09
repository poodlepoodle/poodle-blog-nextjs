import styles from './styles.module.css';

import Image from 'next/image';

import PostThumbnail from '../components/blog/PostThumbnail';
import PostThumbnailLarge from '../components/blog/PostThumbnailLarge';
import More from '../components/common/More';

export default function Page() {
  return (
    <section className={styles.layout}>
      <div className={styles.container}>
        <div className={styles.banner__container}>
          <Image
            src="/blog/banner.png"
            fill
            alt="Profile picture in top navigation"
          />
        </div>

        <div className={styles.post__row}>
          <PostThumbnailLarge src="/blog/1_large.png" />
          <PostThumbnail src="/blog/1.png" />
        </div>

        <div className={styles.post__row}>
          <PostThumbnail src="/blog/2.png" />
          <PostThumbnail src="/blog/2.png" />
          <PostThumbnail src="/blog/2.png" />
        </div>

        <div className={styles.centered__row}>
          <More />
        </div>
      </div>
    </section>
  );
}
