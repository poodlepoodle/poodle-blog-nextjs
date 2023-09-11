import styles from './mdx-components.module.css';

export const MDXH1 = ({ children }) => (
  <h1 className={styles.mdx__h1}>{children}</h1>
);
export const MDXH2 = ({ children }) => (
  <h2 className={styles.mdx__h2}>{children}</h2>
);
export const MDXH3 = ({ children }) => (
  <h3 className={styles.mdx__h3}>{children}</h3>
);
export const MDXH4 = ({ children }) => (
  <h4 className={styles.mdx__h4}>{children}</h4>
);
export const MDXH5 = ({ children }) => (
  <h5 className={styles.mdx__h5}>{children}</h5>
);
export const MDXH6 = ({ children }) => (
  <h6 className={styles.mdx__h6}>{children}</h6>
);
