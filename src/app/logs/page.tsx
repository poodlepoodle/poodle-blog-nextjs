import type { Metadata } from 'next';

import JsonLd from '@components/json-ld';
import { getLogPosts } from '@utils/get-posts';
import Link from 'next/link';
import {
  METADATA_PRESET,
  METADATA_OG_WEBSITE_PRESET,
} from '@constants/metadata';
import { logListStructuredData } from '@constants/json-ld';

export const metadata: Metadata = {
  ...METADATA_PRESET,
  title: '로그 ••• 푸들 블로그',
  alternates: {
    canonical: '/logs',
  },
  openGraph: {
    ...METADATA_OG_WEBSITE_PRESET,
    url: '/logs',
  },
};

const UpdatedIcon = () => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="5"
      height="5"
      viewBox="0 0 6 6"
      fill="none"
      className="shrink-0"
    >
      <circle cx="3" cy="3" r="3" className="fill-skyblue" />
    </svg>
  );
};

export default async function Page() {
  const posts = await getLogPosts();
  const jsonLd = logListStructuredData(posts);

  return (
    <>
      <JsonLd structuredData={jsonLd} />
      <section className="flex w-full max-w-container flex-col gap-[1rem] px-[1.5rem] pt-container-top pb-container-bottom desktop:px-0">
        {posts.map(post => (
          <Link
            key={post.slug}
            href={`/logs/${post.slug}`}
            className="flex w-full items-center justify-center gap-[1.5rem] rounded-lg px-[1rem] py-[0.8rem] transition-colors duration-300 hover:bg-sky-100 desktop:gap-items"
          >
            <div className="flex min-w-[6rem] flex-col">
              <span className="text-sm font-medium text-black">
                {post.publishedAt}
              </span>
            </div>
            <div className="flex flex-1 items-center justify-end gap-[0.5rem] desktop:justify-start">
              {post.updated && <UpdatedIcon />}
              <h2 className="line-clamp-1 text-lg font-bold text-black">
                {post.title}
              </h2>
            </div>
          </Link>
        ))}
      </section>
    </>
  );
}
