import Image from 'next/image';
import styles from './search.module.css';

export default function Search() {
  return (
    <div className={styles.layout}>
      <div className={styles.icon__container}>
        <Image src="/components/search/icon.png" fill alt="magnifier icon" />
      </div>

      <input
        className={styles.input}
        type="text"
        placeholder="검색어를 입력하세요"
      />
    </div>
  );
}
