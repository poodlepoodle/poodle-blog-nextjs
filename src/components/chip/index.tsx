import styles from './chip.module.css';

export default function Chip({
  name,
  count,
  isSelected,
  onClick,
}: {
  name: string;
  count?: number;
  isSelected?: boolean;
  onClick?: () => void;
}) {
  return (
    <div
      className={isSelected ? styles.layout_selected : styles.layout_default}
      onClick={onClick}
    >
      <span className={styles.name}>{name}</span>
      {count != null && <span className={styles.count}>{count}</span>}
    </div>
  );
}
