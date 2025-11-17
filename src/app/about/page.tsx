import type { Metadata } from 'next';

import Link from 'next/link';
import Image from 'next/image';
import Icon from '@components/icon';
import { Paper } from '@components/common/paper';
import {
  METADATA_PRESET,
  METADATA_OG_WEBSITE_PRESET,
} from '@constants/metadata';
import { ABOUT_LINK_ITEMS } from '@/constants';

export const metadata: Metadata = {
  ...METADATA_PRESET,
  title: '소개 ••• 푸들 블로그',
  alternates: {
    canonical: '/about',
  },
  openGraph: {
    ...METADATA_OG_WEBSITE_PRESET,
    url: '/about',
    images: [
      {
        url: '/about/introduction-1.jpg',
        alt: 'poodle blog profile large image',
      },
    ],
  },
};

const ArrowIcon = () => {
  return (
    <Icon width={6} height={6} color="var(--color-black)">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="6"
        height="6"
        viewBox="0 0 6 6"
        fill="none"
      >
        <path
          d="M0.718686 6L0 5.28131L4.25767 1.02364H0.476837V0H6V5.52316H4.97636V1.74233L0.718686 6Z"
          fill="var(--color-black)"
        />
      </svg>
    </Icon>
  );
};

export default async function Page() {
  return (
    <section className="flex w-full flex-col items-center">
      <Paper className="mt-container-top mb-container-bottom flex h-full w-full flex-col gap-items py-[3.75rem]">
        <section className="flex w-full flex-col gap-[2rem] px-[3.75rem]">
          <h1 className="text-right text-xl font-normal break-keep text-black transition-transform duration-350 ease-in-out hover:-translate-y-2">
            안녕하세요.
          </h1>
          <h2 className="text-right text-xl font-normal break-keep text-black transition-transform duration-350 ease-in-out hover:-translate-y-2">
            애정을 담아 사용자와 인터랙션하고 싶은
            <br />
            프론트엔드 개발자 최어진입니다.
          </h2>
        </section>
        <div className="relative h-[20rem] w-full overflow-hidden rounded-2xl mix-blend-luminosity shadow-natural">
          <Image
            src="/about/introduction-1.jpg"
            alt="introduction image 1"
            fill
            className="object-cover"
          />
        </div>
        <div className="flex w-full justify-end gap-items px-[3.75rem]">
          {ABOUT_LINK_ITEMS.map(({ href, label }) => (
            <Link
              key={`${href}-${label}`}
              className="flex items-center gap-[0.35rem] text-black transition-colors duration-300 hover:text-skyblue"
              href={href}
              target="_blank"
            >
              <span className="text-sm font-normal">{label}</span>
              <ArrowIcon />
            </Link>
          ))}
        </div>
      </Paper>
    </section>
  );
}
