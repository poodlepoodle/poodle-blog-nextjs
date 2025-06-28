import styles from './mdx-components.module.css';

interface MDXCommonListProps {
  children: React.ReactNode;
  props: React.HTMLAttributes<HTMLOListElement | HTMLUListElement>;
}

export function MDXOrderedList({ children, ...props }: MDXCommonListProps) {
  return (
    <ol {...props} className={styles.mdx__list}>
      {children}
    </ol>
  );
}

export function MDXUnorderedList({ children, ...props }: MDXCommonListProps) {
  return (
    <ul {...props} className={styles.mdx__list}>
      {children}
    </ul>
  );
}
