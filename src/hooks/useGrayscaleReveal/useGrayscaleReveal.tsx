'use client';

import React, { useEffect, useRef, type ReactNode } from 'react';
import { cn } from '@/utils/cn';
import styles from './useGrayscaleReveal.module.css';

type UseGrayscaleRevealResult = {
  containerRef: React.RefObject<HTMLDivElement | null>;
  GrayscaleRevealWrapper: (props: {
    children: ReactNode;
    grayscaleContent?: ReactNode;
    className?: string;
  }) => React.ReactElement;
};

export const useGrayscaleReveal = (): UseGrayscaleRevealResult => {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const isHovered = useRef(false);
  const frameRef = useRef<number | null>(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const handleMouseMove = (e: MouseEvent) => {
      if (!isHovered.current) return;

      if (frameRef.current) {
        cancelAnimationFrame(frameRef.current);
      }

      frameRef.current = requestAnimationFrame(() => {
        const container = containerRef.current;
        if (!container) return;

        const rect = container.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;

        container.style.setProperty('--mouse-x', `${x}px`);
        container.style.setProperty('--mouse-y', `${y}px`);
      });
    };

    const handleMouseEnter = (e: MouseEvent) => {
      isHovered.current = true;

      const rect = container.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;

      container.style.setProperty('--mouse-x', `${x}px`);
      container.style.setProperty('--mouse-y', `${y}px`);
    };

    const handleMouseLeave = () => {
      isHovered.current = false;
      if (frameRef.current) {
        cancelAnimationFrame(frameRef.current);
        frameRef.current = null;
      }
    };

    container.addEventListener('mousemove', handleMouseMove);
    container.addEventListener('mouseenter', handleMouseEnter);
    container.addEventListener('mouseleave', handleMouseLeave);

    return () => {
      container.removeEventListener('mousemove', handleMouseMove);
      container.removeEventListener('mouseenter', handleMouseEnter);
      container.removeEventListener('mouseleave', handleMouseLeave);
      if (frameRef.current) {
        cancelAnimationFrame(frameRef.current);
      }
    };
  }, []);

  const GrayscaleRevealWrapper = ({
    children,
    grayscaleContent,
    className,
  }: {
    children: ReactNode;
    grayscaleContent?: ReactNode;
    className?: string;
  }) => (
    <div className={cn(styles.container, className)} ref={containerRef}>
      <div className={styles.grayscale__layer}>
        {grayscaleContent ?? children}
      </div>
      <div className={styles.color__layer}>{children}</div>
    </div>
  );

  return {
    containerRef,
    GrayscaleRevealWrapper,
  };
};
