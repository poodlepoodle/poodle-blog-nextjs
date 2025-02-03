'use client';
import styles from './header.module.css';

import { useBlogContext } from '@contexts/BlogContext';

import Image from 'next/image';
import Link from 'next/link';

export default function Header() {
  const { isFloating, isSpotlighted, headerText } = useBlogContext();

  return (
    <header
      className={`${styles.layout} ${isFloating ? styles.floating : ''} ${
        isSpotlighted && !!headerText ? styles.spotlighted : ''
      }`}
    >
      <div className={styles.container}>
        {isSpotlighted && !!headerText ? (
          <div className={styles.description__container}>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="12"
              height="12"
              viewBox="0 0 12 12"
              fill="none"
            >
              <path
                d="M3.23412 12C3.44646 12 3.60436 11.8913 3.86026 11.6523L5.82579 9.85966H9.50634C11.1289 9.85966 12 8.96879 12 7.37712V3.21594C12 1.62427 11.1289 0.727932 9.50634 0.727932H2.49365C0.871144 0.727932 0 1.61884 0 3.21594V7.37712C0 8.97422 0.871144 9.85966 2.49365 9.85966H2.74955V11.4405C2.74955 11.7773 2.92378 12 3.23412 12Z"
                fill="black"
                fillOpacity="0.85"
              />
              <path
                d="M3.10891 3.74831C2.92923 3.74831 2.78223 3.60706 2.78223 3.42236C2.78223 3.24853 2.92923 3.10186 3.10891 3.10186H8.82579C9.00546 3.10186 9.14703 3.24853 9.14703 3.42236C9.14703 3.60706 9.00546 3.74831 8.82579 3.74831H3.10891ZM3.10891 5.57355C2.92923 5.57355 2.78223 5.42688 2.78223 5.2422C2.78223 5.06836 2.92923 4.92169 3.10891 4.92169H8.82579C9.00546 4.92169 9.14703 5.06836 9.14703 5.2422C9.14703 5.42688 9.00546 5.57355 8.82579 5.57355H3.10891ZM3.10891 7.39339C2.92923 7.39339 2.78223 7.25214 2.78223 7.07288C2.78223 6.8882 2.92923 6.74153 3.10891 6.74153H6.8276C7.00726 6.74153 7.14883 6.8882 7.14883 7.07288C7.14883 7.25214 7.00726 7.39339 6.8276 7.39339H3.10891Z"
                fill="white"
              />
            </svg>
            <span>{headerText}</span>
          </div>
        ) : (
          <div className={styles.profile__container}>
            <Link href="/">
              <Image
                src={`/blog/new-wave.png`}
                alt="profile pic in top navigation"
                fill
                style={{
                  objectFit: 'cover',
                }}
              />
            </Link>
          </div>
        )}

        <nav className={styles.nav}>
          <Link href="/about">소개</Link>
          <Link href="/blog">블로그</Link>
        </nav>
      </div>
    </header>
  );
}
