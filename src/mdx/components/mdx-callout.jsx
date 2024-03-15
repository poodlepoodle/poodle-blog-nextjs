import styles from './mdx-components.module.css';

export default function MDXCallOut({ children }) {
  return <div className={styles.mdx__callout}>{children}</div>;
}
