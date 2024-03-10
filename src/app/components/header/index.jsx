'use client';

import styles from './header.module.css';

import { usePathname } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';

import profile_img from '@resources/components/header/profile.png';

export default function Header() {
  const pathname = usePathname();

  return (
    <header
      className={pathname === '/' ? styles.layout__focused : styles.layout}
    >
      <div className={styles.container}>
        <section>
          <div
            className={
              pathname === '/'
                ? styles.profile__container__focused
                : styles.profile__container
            }
          >
            <Link href="/">
              <Image
                src={profile_img}
                fill
                alt="profile pic in top navigation"
              />
            </Link>
          </div>
        </section>

        <nav className={pathname === '/' ? styles.nav__focused : styles.nav}>
          <Link href="/blog">블로그</Link>
          <Link href="https://read.cv/poodlepoodle" target="_blank">
            CV
          </Link>
        </nav>
      </div>
    </header>
  );
}
