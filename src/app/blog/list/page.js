import styles from './styles.module.css';

import Search from '@components/search/Search';
import ThumbnailRow from '@components/thumbnail/row/Row';

export default function Page() {
  return (
    <section className={styles.layout}>
      <div className={styles.container}>
        <div className={styles.centered__row}>
          <Search />
        </div>

        <div className={styles.content}>
          <ThumbnailRow src="/blog/1.png" />
          <ThumbnailRow src="/blog/2.png" />
          <ThumbnailRow src="/blog/1.png" />
          <ThumbnailRow src="/blog/2.png" />
          <ThumbnailRow src="/blog/1.png" />
        </div>
      </div>
    </section>
  );
}
