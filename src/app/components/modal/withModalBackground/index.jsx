'use client';

import styles from './withmodalbackground.module.css';

export default function withModalBackground(WrappedModal) {
  return (props) => {
    const handleBackgroundClick = (event) => {
      if (event.target === event.currentTarget) {
        props.onCloseModal();
      }
    };

    return (
      <div
        className={styles.background__layout}
        onClick={handleBackgroundClick}
      >
        <WrappedModal {...props} />
      </div>
    );
  };
}
