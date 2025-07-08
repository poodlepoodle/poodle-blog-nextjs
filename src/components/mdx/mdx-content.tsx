import type { MDXComponents } from 'next-mdx-remote-client/rsc';

import remarkGfm from 'remark-gfm';
import MDXCode from './mdx-components/mdx-code';
import MDXImage from './mdx-components/mdx-image';
import MDXLink from './mdx-components/mdx-link';
import MDXBlockquote from './mdx-components/mdx-blockquote';
import { MDXOrderedList, MDXUnorderedList } from './mdx-components/mdx-list';
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
  blockquote: MDXBlockquote,
  ul: MDXUnorderedList,
  ol: MDXOrderedList,
};

interface MDXContentProps {
  source: string;
}

export function MDXContent({ source }: MDXContentProps) {
  return (
    <article className="prose max-w-none px-20 text-base leading-8 break-keep md:text-lg md:leading-9 [&>*]:my-10 [&>h2]:pt-20 [&>h3]:pt-10">
      <MDXRemote source={source} options={options} components={mdxComponents} />
    </article>
  );
}
