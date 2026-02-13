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
  h2: MDXH2,
  h3: MDXH3,
};

const mdxPlaygroundComponents: MDXComponents = {
  CommonComponentLayout,
  ImageMarquee,
  LogoMarquee,
};

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
    <article className="prose max-w-none gap-[3rem] px-[2rem] text-base leading-8 break-keep tablet:prose-lg tablet:px-[2.5rem] tablet:leading-9 desktop:px-[5.5rem] prose-headings:font-bold prose-p:font-medium prose-li:font-medium [&_li::marker]:text-gray-2 [&>*]:py-0 [&>*:not(h2)]:my-post-paragraph [&>h2]:mt-post-h2 [&>h2]:mb-post-paragraph">
      <MDXRemote source={source} options={options} components={mdxComponents} />
    </article>
  );
};
