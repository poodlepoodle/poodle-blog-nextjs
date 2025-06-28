import styles from './mdx-components.module.css';

interface MDXBlockquoteProps {
  children: React.ReactNode;
  props: React.HTMLAttributes<HTMLQuoteElement>;
}

export default function MDXBlockquote({
  children,
  ...props
}: MDXBlockquoteProps) {
  return (
    <blockquote {...props} className={styles.mdx__blockquote}>
      {children}
    </blockquote>
  );
}
