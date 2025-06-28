import { MDXRemote } from 'next-mdx-remote/rsc';

import remarkGfm from 'remark-gfm';
import remarkA11yEmoji from '@fec/remark-a11y-emoji';
import { mdxComponents } from './components';
import styles from './post-body.module.css';

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
    <article className={styles.article}>
      <MDXRemote
        source={children}
        options={options}
        components={mdxComponents}
      />
    </article>
  );
}
