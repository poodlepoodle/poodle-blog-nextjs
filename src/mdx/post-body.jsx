import { MDXRemote } from 'next-mdx-remote/rsc';

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
    <article className="prose max-w-none pt-12 pb-4 px-14 text-lg space-y-12 break-keep">
      <MDXRemote
        source={children}
        options={options}
        components={mdxComponents}
      />
    </article>
  );
}
