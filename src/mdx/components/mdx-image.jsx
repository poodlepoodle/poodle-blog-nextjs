import styles from './mdx-components.module.css';

import Image from 'next/image';

export default function MDXImage({ src, alt }) {
  return <Image src={src} alt={alt} fill className={styles.mdx__image} />;
}
