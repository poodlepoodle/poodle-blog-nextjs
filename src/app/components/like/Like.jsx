import styles from './like.module.css';

import Image from 'next/image';

export default function Like({ likeCount }) {
  return (
    <div className={styles.layout}>
      <div className={styles.icon__container}>
        <Image src="/components/like/icon.png" fill alt="like icon" />
      </div>

      <span>{likeCount}</span>
    </div>
  );
}
