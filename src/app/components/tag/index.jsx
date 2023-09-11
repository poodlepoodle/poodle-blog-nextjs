import styles from './tag.module.css';

export default function Tag({ text }) {
  return (
    <div className={styles.layout}>
      <span>{text}</span>
    </div>
  );
}
