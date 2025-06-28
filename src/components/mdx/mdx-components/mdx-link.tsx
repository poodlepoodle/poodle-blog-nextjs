import styles from './mdx-components.module.css';
import Link from 'next/link';

interface MDXLinkProps {
  children: React.ReactNode;
  props: React.HTMLAttributes<HTMLAnchorElement>;
  href: string;
}

export default function MDXLink(props: MDXLinkProps) {
  const href = props.href;
  const isInternalLink = href && href.startsWith('/');

  if (isInternalLink) {
    return (
      <Link href={href} className={styles.mdx__link}>
        {props.children}
      </Link>
    );
  }

  return <a target="_blank" {...props} className={styles.mdx__link} />;
}
