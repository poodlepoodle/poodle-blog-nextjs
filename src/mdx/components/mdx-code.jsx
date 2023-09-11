import styles from './mdx-components.module.css';

import { Code } from 'bright';

export default function MDXCode({ children }, ...props) {
  return (
    <Code
      {...props}
      // land="py"
      className={styles.mdx__code}
      // theme="github-light"
    >
      {children}
    </Code>
  );
}
