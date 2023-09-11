// import styles from './post-body.module.css';

import { MDXRemote } from 'next-mdx-remote/rsc';
// import { MDXProvider } from '@mdx-js/react';

import remarkGfm from 'remark-gfm';
// import remarkFrontmatter from 'remark-frontmatter';
// import rehypeSlug from 'rehype-slug';
// import rehypeAutolinkHeadings from 'rehype-autolink-headings';
// // @ts-expect-error no types
import remarkA11yEmoji from '@fec/remark-a11y-emoji';
// import remarkToc from 'remark-toc';
import { mdxComponents } from './components';

const options = {
  mdxOptions: {
    remarkPlugins: [
      remarkGfm,
      //       remarkFrontmatter,
      remarkA11yEmoji,
      //       [
      //         remarkToc,
      //         {
      //           tight: true,
      //           maxDepth: 5,
      //         },
      //       ],
    ],
    rehypePlugins: [],
    // rehypePlugins: [],
  },
};

export function PostBody({ children }) {
  return (
    <article className="prose max-w-none px-14">
      <MDXRemote
        source={children}
        options={options}
        // components={mdxComponents}
      />
    </article>
  );
}
