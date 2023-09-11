import styles from './mdx-components.module.css';

import { Code } from 'bright';

export default function MDXCode({ children }, props) {
  return (
    <Code {...props} className={styles.mdx__code} theme="material-default">
      {children}
    </Code>
  );
}
