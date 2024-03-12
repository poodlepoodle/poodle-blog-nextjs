'use client';

import styles from './footer.module.css';

import { usePathname } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';

import icon_mail from '@resources/components/footer/mail.png';
import icon_github from '@resources/components/footer/github.png';
import icon_instagram from '@resources/components/footer/instagram.png';

export default function BottomNav() {
  const pathname = usePathname();

  return (
    <footer
      className={pathname === '/' ? styles.layout__focused : styles.layout}
    >
      <div className={styles.container}>
        <section className={styles.copyright}>ⓒ Eojin Choi 2023</section>

        <nav className={styles.nav}>
          <div className={styles.icon__container}>
            <Link href="mailto: chammal97@naver.com" target="_blank">
              <Image src={icon_mail} fill alt="link to mail" />
            </Link>
          </div>

          <div className={styles.icon__container}>
            <Link href="https://github.com/poodlepoodle" target="_blank">
              <Image src={icon_github} fill alt="link to github" />
            </Link>
          </div>

          <div className={styles.icon__container}>
            <Link href="https://instagram.com/enfp._.oodle" target="_blank">
              <Image src={icon_instagram} fill alt="link to instagram" />
            </Link>
          </div>
        </nav>
      </div>
    </footer>
  );
}
