import styles from './footer.module.css';

import Link from 'next/link';

export default function BottomNav() {
  return (
    <footer className={styles.layout}>
      <div className={styles.container}>
        <section className={styles.copyright}>ⓒ Eojin Choi 2025</section>

        <nav className={styles.nav}>
          <div className={styles.icon__container}>
            <Link href="mailto: chammal97@naver.com" target="_blank">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
              >
                <path
                  fillRule="evenodd"
                  clipRule="evenodd"
                  d="M16.6033 6.54867C15.3643 5.36697 13.7108 4.7232 12 4.74966C8.86937 4.74966 6.21056 6.86171 5.26254 9.70571C4.75988 11.1961 4.75987 12.8099 5.26254 14.3003H5.26694C6.21935 17.1399 8.87377 19.252 12.0044 19.252C13.6204 19.252 15.0078 18.8386 16.0831 18.1085V18.1056C17.3485 17.2678 18.2128 15.9494 18.4817 14.4591H12V9.83807H23.3188C23.4599 10.6406 23.526 11.4607 23.526 12.2764C23.526 15.9263 22.2216 19.0121 19.9521 21.1021L19.9544 21.1039C17.9658 22.9382 15.2364 24.0008 12 24.0008C7.46278 24.0008 3.3136 21.4434 1.27649 17.3912C-0.425501 14.0005 -0.425496 10.0056 1.2765 6.61484C3.31361 2.55825 7.46278 0.000808666 12 0.000808666C14.9807 -0.034466 17.86 1.0855 20.0294 3.12262L16.6033 6.54867Z"
                  fill="#131926"
                />
              </svg>
            </Link>
          </div>

          <div className={styles.icon__container}>
            <Link href="https://github.com/poodlepoodle" target="_blank">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
              >
                <path
                  fillRule="evenodd"
                  clipRule="evenodd"
                  d="M12 0C5.3724 0 0 5.3808 0 12.0204C0 17.3304 3.438 21.8364 8.2068 23.4252C8.8068 23.5356 9.0252 23.1648 9.0252 22.8456C9.0252 22.5612 9.0156 21.804 9.0096 20.802C5.6712 21.528 4.9668 19.1904 4.9668 19.1904C4.422 17.8008 3.6348 17.4312 3.6348 17.4312C2.5452 16.6872 3.7176 16.7016 3.7176 16.7016C4.9212 16.7856 5.5548 17.94 5.5548 17.94C6.6252 19.776 8.364 19.2456 9.0468 18.9384C9.1572 18.162 9.4668 17.6328 9.81 17.3328C7.146 17.0292 4.344 15.9972 4.344 11.3916C4.344 10.08 4.812 9.006 5.5788 8.166C5.4552 7.8624 5.0436 6.6396 5.6964 4.986C5.6964 4.986 6.7044 4.662 8.9964 6.2172C9.97532 5.95022 10.9853 5.81423 12 5.8128C13.02 5.8176 14.046 5.9508 15.0048 6.2172C17.2956 4.662 18.3012 4.9848 18.3012 4.9848C18.9564 6.6396 18.5436 7.8624 18.4212 8.166C19.1892 9.006 19.6548 10.08 19.6548 11.3916C19.6548 16.0092 16.848 17.0256 14.1756 17.3232C14.6064 17.694 14.9892 18.4272 14.9892 19.5492C14.9892 21.1548 14.9748 22.452 14.9748 22.8456C14.9748 23.1672 15.1908 23.5416 15.8004 23.424C18.19 22.6225 20.2672 21.0904 21.7386 19.0441C23.2099 16.9977 24.001 14.5408 24 12.0204C24 5.3808 18.6264 0 12 0Z"
                  fill="#131926"
                />
              </svg>
            </Link>
          </div>
        </nav>
      </div>
    </footer>
  );
}
