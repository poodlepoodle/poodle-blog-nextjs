import styles from './mdx-components.module.css';

import Image from 'next/image';

export default function MDXImage({ src, alt }) {
  let imageWidth;
  const url = new URL(src, 'https://poodlepoodle.me');
  const widthParam = url.searchParams.get('width');
  if (widthParam) {
    imageWidth = parseInt(widthParam);
    return (
      <Image
        src={src}
        alt={alt}
        width={imageWidth}
        height={100}
        className={styles.mdx__image}
      />
    );
  }

  return <Image src={src} alt={alt} fill className={styles.mdx__image} />;
}
