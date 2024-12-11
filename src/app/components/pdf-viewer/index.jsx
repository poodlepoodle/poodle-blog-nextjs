'use client';

import styles from './pdf-viewer.module.css';

import Image from 'next/image';

import { useState } from 'react';

export default function PDFViewer() {
  const [selectedMenu, setSelectedMenu] = useState(0);

  const handleClickMenu = (idx) => {
    setSelectedMenu(idx);
  };

  const handleClickDownload = () => {};

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
        {/* <div>
          <div
            className={styles.download__button}
            onClick={handleClickDownload}
          >
            PDF 다운로드
          </div>
        </div> */}
      </div>

      <div className={styles.content__container}>
        {selectedMenu === 0 && (
          <>
            <Image
              src={`/portfolio/portfolio-1.webp`}
              alt="portfolio page 1"
              width={960}
              height={600}
              style={{ objectFit: 'cover' }}
            />
            <Image
              src={`/portfolio/portfolio-2.webp`}
              alt="portfolio page 2"
              width={960}
              height={600}
              style={{ objectFit: 'cover' }}
            />
            <Image
              src={`/portfolio/portfolio-3.webp`}
              alt="portfolio page 3"
              width={960}
              height={600}
              style={{ objectFit: 'cover' }}
            />
            <Image
              src={`/portfolio/portfolio-4.webp`}
              alt="portfolio page 4"
              width={960}
              height={600}
              style={{ objectFit: 'cover' }}
            />
            <Image
              src={`/portfolio/portfolio-5.webp`}
              alt="portfolio page 5"
              width={960}
              height={600}
              style={{ objectFit: 'cover' }}
            />
            <Image
              src={`/portfolio/portfolio-6.webp`}
              alt="portfolio page 6"
              width={960}
              height={600}
              style={{ objectFit: 'cover' }}
            />
            <Image
              src={`/portfolio/portfolio-7.webp`}
              alt="portfolio page 7"
              width={960}
              height={600}
              style={{ objectFit: 'cover' }}
            />
          </>
        )}
        {selectedMenu === 1 && (
          <>
            <Image
              src={`/resume/resume-1.webp`}
              alt="resume page 1"
              width={960}
              height={600}
              style={{ objectFit: 'cover' }}
            />
            <Image
              src={`/resume/resume-2.webp`}
              alt="resume page 2"
              width={960}
              height={600}
              style={{ objectFit: 'cover' }}
            />
            <Image
              src={`/resume/resume-3.webp`}
              alt="resume page 3"
              width={960}
              height={600}
              style={{ objectFit: 'cover' }}
            />
            <Image
              src={`/resume/resume-4.webp`}
              alt="resume page 4"
              width={960}
              height={600}
              style={{ objectFit: 'cover' }}
            />
            <Image
              src={`/resume/resume-5.webp`}
              alt="resume page 5"
              width={960}
              height={600}
              style={{ objectFit: 'cover' }}
            />
          </>
        )}
      </div>
    </div>
  );
}
