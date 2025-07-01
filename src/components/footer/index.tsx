import styles from './footer.module.css';
import Link from 'next/link';
import Icon from '@components/icon';

const navItems = [
  {
    href: 'mailto: chammal97@naver.com',
    label: 'email',
  },
  {
    href: 'https://github.com/poodlepoodle',
    label: 'github',
  },
];

const ArrowIcon = () => {
  return (
    <Icon width={6} height={6} color="#131926">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="6"
        height="6"
        viewBox="0 0 6 6"
        fill="none"
      >
        <path
          d="M0.718686 6L0 5.28131L4.25767 1.02364H0.476837V0H6V5.52316H4.97636V1.74233L0.718686 6Z"
          fill="#131926"
        />
      </svg>
    </Icon>
  );
};

export default function Footer() {
  return (
    <footer className={styles.layout}>
      <div className={styles.container}>
        <section className={styles.copyright}>ⓒ Eojin Choi 2025</section>

        <nav className={styles.nav}>
          {navItems.map(({ href, label }) => (
            <Link
              key={href}
              className={styles.nav__item}
              href={href}
              target="_blank"
            >
              <span>{label}</span>
              <ArrowIcon />
            </Link>
          ))}
        </nav>
      </div>
    </footer>
  );
}
