import styles from './mdx-components.module.css';
import { Code } from 'bright';

Code.theme = 'min-light';
Code.lineNumbers = true;

interface MDXCodeProps {
  children: React.ReactNode;
  props: React.HTMLAttributes<HTMLElement>;
}

export default function MDXCode({ children, ...props }: MDXCodeProps) {
  return (
    <Code {...props} className={styles.mdx__code}>
      {children}
    </Code>
  );
}
