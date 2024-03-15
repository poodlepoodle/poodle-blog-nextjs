// import styles from './post-body.module.css';

import { MDXRemote } from 'next-mdx-remote/rsc';
// import { MDXProvider } from '@mdx-js/react';

import remarkGfm from 'remark-gfm';
import remarkA11yEmoji from '@fec/remark-a11y-emoji';
import { mdxComponents } from './components';

const options = {
  mdxOptions: {
    remarkPlugins: [
      remarkGfm,
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
    <article className="prose max-w-none pt-6 px-14 text-lg space-y-12">
      <MDXRemote
        source={children}
        options={options}
        components={mdxComponents}
      />
    </article>
  );
}
