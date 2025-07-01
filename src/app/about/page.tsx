import type { Metadata } from 'next';

import styles from './styles.module.css';
import Link from 'next/link';
import Image from 'next/image';
import Icon from '@components/icon';

const linkItems = [
  {
    href: 'https://nolink.com/resume',
    label: 'resume',
  },
  {
    href: 'https://nolink.com/portfolio',
    label: 'portfolio',
  },
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

export const metadata: Metadata = {
  title: 'About ••• poodlepoodle',
  description:
    '새로운 기술이 파도처럼 몰려와도 지워지지 않을 개발자국을 남깁니다.',
};

export default async function Page() {
  return (
    <section className={styles.layout}>
      <div className={styles.container}>
        <section className={styles.title}>
          <h1>안녕하세요,</h1>
          <h2>
            애정을 갖고 사용자와 인터랙션하고 싶은
            <br />
            프론트엔드 개발자 최어진입니다.
          </h2>
        </section>
        <div className={styles.picture}>
          <Image
            src="/about/introduction-1.jpg"
            alt="introduction image 1"
            fill
            style={{ objectFit: 'cover' }}
          />
        </div>
        <div className={styles.links}>
          {linkItems.map(({ href, label }) => (
            <Link
              key={href}
              className={styles.link__item}
              href={href}
              target="_blank"
            >
              <span>{label}</span>
              <ArrowIcon />
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
