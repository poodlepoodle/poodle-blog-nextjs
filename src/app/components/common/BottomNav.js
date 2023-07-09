import styles from './bottomnav.module.css';

import Image from 'next/image';

export default function BottomNav() {
  return (
    <footer className={styles.layout}>
      <div className={styles.container}>
        <section className={styles.copyright}>
          Copyright 2023. Eojin Choi. All rights reserved.
        </section>

        <nav className={styles.nav}>
          <div className={styles.icon__container}>
            <Image src="/components/footer/mail.png" fill alt="link to mail" />
          </div>

          <div className={styles.icon__container}>
            <Image
              src="/components/footer/github.png"
              fill
              alt="link to github"
            />
          </div>

          <div className={styles.icon__container}>
            <Image
              src="/components/footer/instagram.png"
              fill
              alt="link to instagram"
            />
          </div>
        </nav>
      </div>
    </footer>
  );
}
