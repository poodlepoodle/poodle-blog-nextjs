import styles from './search-bar.module.css';

interface SearchBarProps {
  keyword: string;
  setKeyword: (keyword: string) => void;
}

export default function SearchBar({ keyword, setKeyword }: SearchBarProps) {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setKeyword(e.target.value);
  };

  return (
    <div className={styles.layout}>
      <div className={styles.icon__container}>
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 18 18" fill="none">
          <path
            d="M7.53223 14.0332C8.92969 14.0332 10.2393 13.6113 11.3291 12.8906L15.1787 16.749C15.4336 16.9951 15.7588 17.1182 16.1104 17.1182C16.8398 17.1182 17.376 16.5469 17.376 15.8262C17.376 15.4922 17.2617 15.167 17.0156 14.9209L13.1924 11.0801C13.9834 9.95508 14.4492 8.59277 14.4492 7.11621C14.4492 3.31055 11.3379 0.199219 7.53223 0.199219C3.73535 0.199219 0.615234 3.31055 0.615234 7.11621C0.615234 10.9219 3.72656 14.0332 7.53223 14.0332ZM7.53223 12.1875C4.74609 12.1875 2.46094 9.90234 2.46094 7.11621C2.46094 4.33008 4.74609 2.04492 7.53223 2.04492C10.3184 2.04492 12.6035 4.33008 12.6035 7.11621C12.6035 9.90234 10.3184 12.1875 7.53223 12.1875Z"
            fill="#131926"
          />
        </svg>
      </div>

      <input
        className={styles.input}
        placeholder="키워드를 입력해 주세요."
        type="search"
        value={keyword}
        onChange={handleChange}
      />
    </div>
  );
}
