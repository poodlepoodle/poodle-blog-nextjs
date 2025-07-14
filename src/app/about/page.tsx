import type { Metadata } from 'next';

import styles from './styles.module.css';
import Link from 'next/link';
import Image from 'next/image';
import Icon from '@components/icon';
import { generateCommonMetadata } from '@utils/generate-metadata';

export const metadata: Metadata = generateCommonMetadata({
  title: '소개 ••• 푸들 블로그',
  description:
    '애정을 담아 사용자와 인터랙션하고 싶은 프론트엔드 개발자 최어진입니다.',
});

const linkItems = [
  {
    href: 'https://drive.google.com/drive/folders/1-kvEUsQjFOCqs6GD7B32Q9hbo2BwqM0C?usp=sharing',
    label: 'resume',
  },
  {
    href: 'https://drive.google.com/drive/folders/1-kvEUsQjFOCqs6GD7B32Q9hbo2BwqM0C?usp=sharing',
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

export default async function Page() {
  return (
    <section className={styles.layout}>
      <div className={styles.container}>
        <section className={styles.title}>
          <h1>안녕하세요.</h1>
          <h2>
            애정을 담아 사용자와 인터랙션하고 싶은
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
              key={`${href}-${label}`}
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
