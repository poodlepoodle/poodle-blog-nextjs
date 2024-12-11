'use client';

import styles from './tag.module.css';

import { useRouter } from 'next/navigation';

export default function Tag({ text }) {
  const router = useRouter();

  const handleClickTag = () => {
    router.push(`/blog?search=${text}`);
  };

  return (
    <div className={styles.layout} onClick={handleClickTag}>
      <span>{text}</span>
    </div>
  );
}
