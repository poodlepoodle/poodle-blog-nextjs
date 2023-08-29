import styles from './search.module.css';

import Image from 'next/image';

import icon_search from '@resources/components/search/icon.png';

export default function Search() {
  return (
    <div className={styles.layout}>
      <div className={styles.icon__container}>
        <Image src={icon_search} fill alt="magnifier icon" />
      </div>

      <input
        className={styles.input}
        type="text"
        placeholder="검색어를 입력하세요"
      />
    </div>
  );
}
