import styles from './mdx-components.module.css';
import Image from 'next/image';

interface MDXImageProps {
  src: string;
  alt: string;
  width?: number;
  height?: number;
}

export default function MDXImage({ src, alt, width, height }: MDXImageProps) {
  const url = new URL(src, 'https://poodlepoodle.me');
  const widthParam = url.searchParams.get('width');
  const imageWidth = widthParam ? parseInt(widthParam) : width;

  const baseProps = {
    src,
    alt,
    className: styles.mdx__image,
  } as const;

  if (imageWidth) {
    return <Image {...baseProps} width={imageWidth} height={height || 100} />;
  }

  return <Image {...baseProps} fill />;
}
