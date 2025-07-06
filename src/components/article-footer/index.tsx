import styles from './article-footer.module.css';
import Image from 'next/image';

interface ArticleFooterProps {
  observerRef: React.RefObject<HTMLDivElement>;
  children: React.ReactNode;
}

export default function ArticleFooter({
  observerRef,
  children,
}: ArticleFooterProps) {
  return (
    <div ref={observerRef} className={styles.layout}>
      <div className={styles.profile__container}>
        <div className={styles.profile__info}>
          <span>published by</span>
          <h6>Eojin Choi</h6>
        </div>
        <div className={styles.profile__image}>
          <Image
            src={`/components/article-footer/profile.png`}
            alt="article profile"
            fill
            style={{ objectFit: 'cover', borderRadius: '50%' }}
          />
        </div>
      </div>
      {children}
    </div>
  );
}
