import styles from './banner.module.css';

import Image from 'next/image';
import Link from 'next/link';

export default function Banner({ href, src, text }) {
  return (
    <Link href={href} className={styles.container}>
      <Image
        src={src}
        alt="blog home banner image"
        fill
        style={{ objectFit: 'cover', borderRadius: '0.5rem' }}
      />
      <span className={styles.banner__text}>{text}</span>
    </Link>
  );
}
