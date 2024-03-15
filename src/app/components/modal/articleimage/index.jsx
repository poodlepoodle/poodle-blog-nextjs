'use client';

import styles from './articleimage.module.css';

import withModalBackground from '@components/modal/withModalBackground';

const ArticleImageModal = () => {
  return (
    <div className={styles.modal__overlay}>
      <span>이미지 모달</span>
    </div>
  );
};

export default withModalBackground(ArticleImageModal);
