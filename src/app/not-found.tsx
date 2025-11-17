import type { Metadata } from 'next';

import { Button } from '@components/common/button';
import { METADATA_PRESET } from '@constants/metadata';

export const metadata: Metadata = {
  ...METADATA_PRESET,
  title: '존재하지 않는 페이지 ••• 푸들 블로그',
};

export default async function Page() {
  return (
    <section className="relative flex w-full flex-grow flex-col items-center justify-center">
      <div className="flex w-full flex-col items-center">
        <h1 className="text-center text-2xl font-medium text-black">
          404 NOT FOUND
        </h1>
        <span className="mt-[0.5rem] text-sm font-normal text-gray-3">
          페이지를 찾을 수 없습니다.
        </span>

        <div className="mt-[2.5rem] flex w-full justify-center">
          <Button href="/" label="홈으로 이동하기" replace={true} />
        </div>
      </div>
    </section>
  );
}
