import styles from './button.module.css';
import Link from 'next/link';

export default function Button({ href, label }) {
  return (
    <Link href={href} className={styles.layout}>
      <span>{label}</span>
    </Link>
  );
}
