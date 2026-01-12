import type { MDXComponents } from 'next-mdx-remote-client/rsc';

import remarkGfm from 'remark-gfm';
import {
  MDXCode,
  MDXImage,
  MDXLink,
  MDXBlockquote,
  MDXInlineCode,
} from './mdx-components';
import { MDXRemote } from 'next-mdx-remote-client/rsc';
import rehypeSlug from 'rehype-slug';

const options = {
  mdxOptions: {
    remarkPlugins: [remarkGfm],
    rehypePlugins: [rehypeSlug],
  },
};

const mdxComponents: MDXComponents = {
  a: MDXLink,
  img: MDXImage,
  pre: MDXCode,
  code: MDXInlineCode,
  blockquote: MDXBlockquote,
};

export const MDXContent = ({ source }: { source: string }) => {
  return (
    <article className="prose max-w-none gap-[3rem] px-[2.5rem] text-base leading-8 break-keep tablet:prose-lg tablet:leading-9 desktop:px-[5.5rem] [&_li::marker]:text-gray-2 [&>*]:py-0 [&>*:not(h2)]:my-post-paragraph [&>h2]:mt-post-h2 [&>h2]:mb-post-paragraph">
      <MDXRemote source={source} options={options} components={mdxComponents} />
    </article>
  );
};
