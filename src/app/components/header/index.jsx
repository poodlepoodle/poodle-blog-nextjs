import styles from './header.module.css';

import Image from 'next/image';
import Link from 'next/link';

import profile_img from '@resources/components/header/profile.png';

export default function Header() {
  return (
    <header className={styles.layout}>
      <div className={styles.container}>
        <section>
          <div className={styles.profile__container}>
            <Link href="/">
              <Image
                src={profile_img}
                fill
                alt="profile pic in top navigation"
              />
            </Link>
          </div>
        </section>

        <nav className={styles.nav}>
          {/* <span>포트폴리오</span> */}
          <Link href="/blog">블로그</Link>
          <span>CV</span>
        </nav>
      </div>
    </header>
  );
}
