import type { PostImage } from '@/types';
import type { Image } from 'mdast';

import { unified } from 'unified';
import remarkParse from 'remark-parse';
import remarkGfm from 'remark-gfm';
import { visit } from 'unist-util-visit';

/**
 * 포스트 내용에서 Markdown AST를 파싱하여 이미지 노드를 찾아 반환합니다.
 */
export const extractPostImages = (content: string): PostImage[] => {
  const images: PostImage[] = [];
  const seen = new Set<string>();
  let index = 0;

  try {
    const processor = unified()
      .use(remarkParse as any)
      .use(remarkGfm as any);
    const tree = processor.parse(content);

    visit(tree, 'image', (node: Image) => {
      if (node.url && !seen.has(node.url)) {
        seen.add(node.url);
        images.push({
          src: node.url,
          alt: node.alt ?? '',
          index: index++,
        });
      }
    });
  } catch (error) {
    console.error('Failed to extract images from content:', error);
  }

  return images;
};
