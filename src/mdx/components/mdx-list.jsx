import styles from './mdx-components.module.css';

export const MDXUnorderedList = ({ children }) => (
  <ul className={styles.mdx__ul}>{children}</ul>
);
export const MDXOrderedList = ({ children }) => (
  <ol className={styles.mdx__ol}>{children}</ol>
);
export const MDXListItem = ({ children }) => (
  <li className={styles.mdx__li}>{children}</li>
);
