import styles from './header.module.css';

import Image from 'next/image';
import Link from 'next/link';

export default function Header() {
  return (
    <header className={styles.layout}>
      <div className={styles.container}>
        <section>
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
        </section>

        <nav className={styles.nav}>
          <Link href="/about">소개</Link>
          <Link href="/blog">블로그</Link>
        </nav>
      </div>
    </header>
  );
}
