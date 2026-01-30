import type { Metadata } from 'next';

import { PlaygroundGrid } from '@components/playground-grid';
import { ImageWithSkeleton } from '@components/image-with-skeleton';
import { getPlaygroundPosts } from '@utils/get-posts';
import {
  METADATA_PRESET,
  METADATA_OG_WEBSITE_PRESET,
} from '@constants/metadata';

export const metadata: Metadata = {
  ...METADATA_PRESET,
  title: '플레이그라운드 ••• 푸들 블로그',
  alternates: {
    canonical: '/playground',
  },
  openGraph: {
    ...METADATA_OG_WEBSITE_PRESET,
    url: '/playground',
  },
};

export default async function Page() {
  const posts = await getPlaygroundPosts();

  return (
    <div className="flex w-full flex-col items-center">
      <div className="flex w-full max-w-container flex-col gap-[3.75rem] pt-container-top pb-container-bottom">
        <div className="flex w-fit flex-col gap-[1.5rem] px-[2.5rem] desktop:px-0">
          <div className="relative h-[3.5rem] w-[3.5rem] overflow-hidden rounded-full grayscale-100 transition-transform duration-350 ease-in-out hover:-translate-y-2">
            <ImageWithSkeleton
              src="/playground/profile.png"
              alt="profile image"
              className="border-none"
            />
          </div>
          <p className="text-lg font-medium tracking-[-0.025rem] break-keep text-black transition-transform duration-350 ease-in-out hover:-translate-y-2">
            서비스를 구성하는 부분들 중, 사용자와 가장 가까이에서 소통하는
            인터페이스를 만든다는 점에서
            <br />
            프론트엔드 개발에 매료되었습니다.
          </p>
        </div>

        <PlaygroundGrid posts={posts} />
      </div>
    </div>
  );
}
