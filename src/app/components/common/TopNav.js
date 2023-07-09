import styles from './topnav.module.css';

import Image from 'next/image';
import Link from 'next/link';

export default function TopNav() {
  return (
    <header className={styles.layout}>
      <div className={styles.container}>
        <section>
          <div className={styles.profile__container}>
            <Image
              src="/components/header/profile.png"
              fill
              alt="profile pic in top navigation"
            />
          </div>
        </section>

        <nav className={styles.nav}>
          <span>포트폴리오</span>
          <Link href="/blog">블로그</Link>
          <span>CV</span>
        </nav>
      </div>
    </header>
  );
}
