import styles from './mdx-components.module.css';

import { Code } from 'bright';

Code.theme = 'min-light';
Code.lineNumbers = true;

export default function MDXCode({ children }, ...props) {
  return (
    <Code {...props} className={styles.mdx__code}>
      {children}
    </Code>
  );
}
