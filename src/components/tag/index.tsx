'use client';

import styles from './tag.module.css';
import { useRouter } from 'next/navigation';

export default function Tag({ text }: { text: string }) {
  const router = useRouter();

  const handleClick = () => {
    router.push(`/posts?search=${text}`);
  };

  return (
    <div className={styles.layout} onClick={handleClick}>
      <span>{text}</span>
    </div>
  );
}
