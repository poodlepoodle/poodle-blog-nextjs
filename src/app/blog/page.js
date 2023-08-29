import styles from './styles.module.css';

import Image from 'next/image';

import ThumbnailNormal from '@components/thumbnail/normal/Normal';
import ThumbnailLarge from '@components/thumbnail/large/Large';
import More from '@components/more/More';

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
          <ThumbnailLarge src="/blog/1_large.png" />
          <ThumbnailNormal src="/blog/1.png" />
        </div>

        <div className={styles.post__row}>
          <ThumbnailNormal src="/blog/2.png" />
          <ThumbnailNormal src="/blog/2.png" />
          <ThumbnailNormal src="/blog/2.png" />
        </div>

        <div className={styles.centered__row}>
          <More />
        </div>
      </div>
    </section>
  );
}
