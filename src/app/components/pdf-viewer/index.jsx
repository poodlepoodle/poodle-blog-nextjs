'use client';

import styles from './pdf-viewer.module.css';

import { useState } from 'react';

export default function PDFViewer() {
  const [selectedMenu, setSelectedMenu] = useState(0);

  const handleClickMenu = (idx) => {
    setSelectedMenu(idx);
  };

  const handleClickDownload = () => {
    // alert('pdf 다운로드');
  };

  return (
    <div className={styles.layout}>
      <div className={styles.menu__container}>
        <div className={styles.select__container}>
          <div
            className={
              selectedMenu === 0
                ? styles.select__button__focused
                : styles.select__button
            }
            onClick={() => handleClickMenu(0)}
          >
            포트폴리오
          </div>
          <div
            className={
              selectedMenu === 1
                ? styles.select__button__focused
                : styles.select__button
            }
            onClick={() => handleClickMenu(1)}
          >
            이력서
          </div>
        </div>
        <div>
          <div
            className={styles.download__button}
            onClick={handleClickDownload}
          >
            PDF 다운로드
          </div>
        </div>
      </div>
      <div className={styles.content__container}>
        {selectedMenu === 0 && <span>포트폴리오 내용</span>}
        {selectedMenu === 1 && <span>이력서 내용</span>}
      </div>
    </div>
  );
}
