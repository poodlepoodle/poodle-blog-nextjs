import styles from './chip.module.css';
import Icon from '@components/icon';

const UnselectIcon = () => {
  return (
    <Icon width={4} height={4} color="#ffffff">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="4"
        height="4"
        viewBox="0 0 4 4"
        fill="none"
      >
        <path
          d="M1.99788 2.45392L0.545017 3.90679C0.480051 3.97175 0.406227 4.00276 0.323544 3.99981C0.24086 3.99685 0.167036 3.9629 0.10207 3.89793C0.0371048 3.83296 0.00462205 3.75766 0.00462205 3.67203C0.00462205 3.58639 0.0371048 3.51109 0.10207 3.44612L1.54608 2.00212L0.0932114 0.549254C0.0282459 0.484288 -0.00276039 0.408987 0.000192585 0.323351C0.00314556 0.237715 0.0371048 0.162414 0.10207 0.0974482C0.167036 0.0324827 0.242337 0 0.327973 0C0.413609 0 0.48891 0.0324827 0.553876 0.0974482L1.99788 1.55031L3.45075 0.0974482C3.51571 0.0324827 3.59101 0 3.67665 0C3.76229 0 3.83759 0.0324827 3.90255 0.0974482C3.96752 0.162414 4 0.237715 4 0.323351C4 0.408987 3.96752 0.484288 3.90255 0.549254L2.44969 2.00212L3.90255 3.45498C3.96752 3.51995 4 3.59377 4 3.67646C4 3.75914 3.96752 3.83296 3.90255 3.89793C3.83759 3.9629 3.76229 3.99538 3.67665 3.99538C3.59101 3.99538 3.51571 3.9629 3.45075 3.89793L1.99788 2.45392Z"
          fill="#FAFBFC"
        />
      </svg>
    </Icon>
  );
};

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
      <div className={styles.content}>
        <span className={styles.name}>{name}</span>
        {count != null && <span className={styles.count}>{count}</span>}
      </div>
      {isSelected && <UnselectIcon />}
    </div>
  );
}
