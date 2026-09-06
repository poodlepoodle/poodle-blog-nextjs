import type { MDXComponents } from 'next-mdx-remote-client/rsc';

import remarkGfm from 'remark-gfm';
import {
  MDXCode,
  MDXImage,
  MDXLink,
  MDXBlockquote,
  MDXInlineCode,
  MDXH2,
  MDXH3,
} from './mdx-components';
import { MDXRemote } from 'next-mdx-remote-client/rsc';
import rehypeSlug from 'rehype-slug';
import { cn } from '@/utils/cn';
import { CommonComponentLayout } from '@components/playground/common-layout/CommonComponentLayout';
import {
  ImageMarquee,
  LogoMarquee,
} from '@components/playground/image-marquee';

const options = {
  mdxOptions: {
    remarkPlugins: [remarkGfm],
    rehypePlugins: [rehypeSlug],
  },
};

const baseMdxComponents: MDXComponents = {
  a: MDXLink,
  img: MDXImage,
  pre: MDXCode,
  code: MDXInlineCode,
  blockquote: MDXBlockquote,
  h1: MDXH2,
  h2: MDXH2,
  h3: MDXH3,
};

const mdxPlaygroundComponents: MDXComponents = {
  CommonComponentLayout,
  ImageMarquee,
  LogoMarquee,
};

/** 본문 타이포그래피 · 좌우 여백. 세로 간격은 POST_SPACING에서 통제한다. */
const POST_TYPOGRAPHY =
  'prose max-w-none px-[2rem] text-base leading-8 break-keep tablet:prose-lg tablet:px-[2.5rem] tablet:leading-9 desktop:px-[5.5rem] prose-headings:font-bold prose-p:font-medium prose-li:font-medium [&_li::marker]:text-gray-2';

/**
 * 본문 세로 리듬. 직계 자식(`>`)만 대상이며, 중첩된 요소는 prose 기본값을 따른다.
 *
 * - 세로 padding을 0으로 리셋하고 간격은 margin으로만 통제한다 (인접 형제 margin collapse 전제 — 실제 간격은 합이 아니라 max)
 * - 비대칭 간격을 주는 heading은 `:not()`으로 균일 규칙에서 제외해 적용 대상을 명확히 한다.
 */
const POST_SPACING = [
  // 모든 직계 자식의 prose 기본 세로 padding을 제거한다.
  '[&>*]:py-0',
  // h2·h3을 제외한 직계 자식에는 본문 기본 상하 여백을 적용한다.
  '[&>*:not(h2):not(h3)]:my-post-paragraph',
  // 직계 h2에는 새 섹션을 구분하는 큰 위 여백을 적용한다.
  '[&>h2]:mt-post-h2',
  // 직계 h2 뒤에는 본문 기본 간격을 둔다.
  '[&>h2]:mb-post-paragraph',
  // 직계 h3에는 h2보다 작은 섹션 구분용 위 여백을 적용한다.
  '[&>h3]:mt-post-h3',
  // 직계 h3 뒤에는 본문 기본 간격을 둔다.
  '[&>h3]:mb-post-paragraph',
  // h2 바로 뒤의 직계 h3는 본문 기본 간격만 두도록 h3의 위 여백을 덮어쓴다.
  '[&>h2_+_h3]:mt-post-paragraph',
];

type MDXContentProps = {
  source: string;
  isPlayground?: boolean;
};

export const MDXContent = ({
  source,
  isPlayground = false,
}: MDXContentProps) => {
  const mdxComponents = isPlayground
    ? { ...baseMdxComponents, ...mdxPlaygroundComponents }
    : baseMdxComponents;

  return (
    <article className={cn(POST_TYPOGRAPHY, POST_SPACING)}>
      <MDXRemote source={source} options={options} components={mdxComponents} />
    </article>
  );
};
