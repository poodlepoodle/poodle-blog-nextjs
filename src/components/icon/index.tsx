import styles from './icon.module.css';
import React, { CSSProperties, ReactNode } from 'react';

interface IconProps {
  width: number | string;
  height: number | string;
  color?: string;
  children: ReactNode;
  className?: string;
  style?: CSSProperties;
}

export default function Icon({
  width,
  height,
  color = 'white',
  children,
  className,
  style,
}: IconProps) {
  return (
    <div
      className={`${styles.container} ${className || ''}`}
      style={{
        width,
        height,
        ...style,
      }}
    >
      {React.Children.map(children, child => {
        if (!React.isValidElement(child)) return child;

        if (child.type === 'svg') {
          return React.cloneElement(child, {
            width,
            height,
            fill: color,
            ...child.props,
          });
        }
        return child;
      })}
    </div>
  );
}
