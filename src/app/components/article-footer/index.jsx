import styles from './article-footer.module.css';

import Image from 'next/image';

export default function ArticleFooter({ observerRef, children }) {
  return (
    <section ref={observerRef} className={styles.layout}>
      <div className={styles.profile__container}>
        <div className={styles.profile__info}>
          <span>published by</span>
          <h6>Eojin Choi</h6>
        </div>
        <div className={styles.profile__image}>
          <Image
            src={`/blog/article-profile.png`}
            alt="article profile"
            fill
            style={{ objectFit: 'cover', borderRadius: '50%' }}
          />
        </div>
      </div>
      {children}
    </section>
  );
}
