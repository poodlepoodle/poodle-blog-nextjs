'use client';

import styles from './masonry-layout.module.css';
import { useEffect, useState, useRef } from 'react';

type Item = {
  id: number;
  height: number;
};

/* 50px ~ 300px 사이의 높이를 랜덤으로 가지는 목업 데이터 생성 */
const items: Item[] = Array.from({ length: 10 }, (_, index) => ({
  id: index + 1,
  height: Math.floor(Math.random() * 250) + 50,
}));

export const MasonryLayout = () => {
  const [columns, setColumns] = useState<Item[][]>([]);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const distributeItemsToColumns = () => {
      if (!containerRef.current || items.length === 0) {
        return;
      }

      const minColWidth = 250; // px
      const gap = 20; // px

      const containerWidth = containerRef.current.offsetWidth;
      const columnCount =
        Math.floor((containerWidth + gap) / (minColWidth + gap)) || 1;

      const newColumns: Item[][] = Array.from(
        { length: columnCount },
        () => []
      );
      const columnHeights = Array(columnCount).fill(0);

      items.forEach(item => {
        const shortestColumnHeight = Math.min(...columnHeights);
        const shortestColumnIndex = columnHeights.indexOf(shortestColumnHeight);

        newColumns[shortestColumnIndex]?.push(item);
        columnHeights[shortestColumnIndex] += item.height + gap;
      });

      setColumns(newColumns);
    };

    distributeItemsToColumns();
    window.addEventListener('resize', distributeItemsToColumns);

    return () => window.removeEventListener('resize', distributeItemsToColumns);
  }, [items]);

  return (
    <div className={styles.container} ref={containerRef}>
      {columns.map((column, index) => (
        <div className={styles.column} key={index}>
          {column.map(item => (
            <div
              key={item.id}
              className={styles.item}
              style={{ height: `${item.height}px` }}
            >
              <span className={styles.itemTitle}>{item.id}</span>
            </div>
          ))}
        </div>
      ))}
    </div>
  );
};
