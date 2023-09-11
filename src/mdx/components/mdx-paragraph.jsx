import styles from './mdx-components.module.css';

export default function MDXParagraph({ children }) {
  return <p className={styles.mdx__p}>{children}</p>;
}
