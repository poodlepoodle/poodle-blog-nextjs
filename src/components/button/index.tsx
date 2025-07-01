import type { LinkProps } from 'next/link';

import styles from './button.module.css';
import Link from 'next/link';

interface ButtonProps extends LinkProps {
  href: string;
  label: string;
  replace?: boolean;
}

export default function Button({ href, label, replace = false }: ButtonProps) {
  return (
    <Link href={href} replace={replace} className={styles.layout}>
      <span>{label}</span>
    </Link>
  );
}
