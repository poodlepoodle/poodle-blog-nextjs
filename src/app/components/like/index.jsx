import styles from './like.module.css';

import Image from 'next/image';

import icon_like from '@resources/components/like/icon.png';

export default function Like({ likeCount }) {
  return (
    <div className={styles.layout}>
      <div className={styles.icon__container}>
        <Image src={icon_like} fill alt="like icon" />
      </div>

      <span>{likeCount}</span>
    </div>
  );
}
