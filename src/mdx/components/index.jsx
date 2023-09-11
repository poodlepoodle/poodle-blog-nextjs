import { MDXH1, MDXH2, MDXH3, MDXH4, MDXH5, MDXH6 } from './mdx-heading';
import { MDXUnorderedList, MDXOrderedList, MDXListItem } from './mdx-list';
import MDXCode from './mdx-code';
import MDXHorizon from './mdx-horizon';
import MDXImage from './mdx-image';
import MDXLink from './mdx-link';
import MDXParagraph from './mdx-paragraph';

export const mdxComponents = {
  a: MDXLink,
  img: MDXImage,
  h1: MDXH1,
  h2: MDXH2,
  h3: MDXH3,
  h4: MDXH4,
  h5: MDXH5,
  h6: MDXH6,
  p: MDXParagraph,
  hr: MDXHorizon,
  pre: MDXCode,
  ul: MDXUnorderedList,
  ol: MDXOrderedList,
  li: MDXListItem,
};
