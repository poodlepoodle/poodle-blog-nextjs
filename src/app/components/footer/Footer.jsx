import styles from './footer.module.css';

import Image from 'next/image';
import Link from 'next/link';

export default function BottomNav() {
  return (
    <footer className={styles.layout}>
      <div className={styles.container}>
        <section className={styles.copyright}>
          Copyright 2023. Eojin Choi. All rights reserved.
        </section>

        <nav className={styles.nav}>
          <div className={styles.icon__container}>
            <Link href="mailto: chammal97@naver.com" target="_blank">
              <Image
                src="/components/footer/mail.png"
                fill
                alt="link to mail"
              />
            </Link>
          </div>

          <div className={styles.icon__container}>
            <Link href="https://github.com/poodlepoodle" target="_blank">
              <Image
                src="/components/footer/github.png"
                fill
                alt="link to github"
              />
            </Link>
          </div>

          <div className={styles.icon__container}>
            <Link href="https://instagram.com/enfp._.oodle" target="_blank">
              <Image
                src="/components/footer/instagram.png"
                fill
                alt="link to instagram"
              />
            </Link>
          </div>
        </nav>
      </div>
    </footer>
  );
}
