import { useEffect, useState } from 'react';

import { useTOCContext } from '@/contexts/toc-context';
import { type HeadingLevel } from '@/contexts/toc-context';

type HeadingInfo = {
  element: HTMLElement;
  level: HeadingLevel;
  text: string;
  top: number;
};

const SCROLL_THRESHOLD = 0; // 30% of viewport height
const OBSERVER_ROOT_MARGIN = '-80px 0px -80% 0px';
const OBSERVER_THRESHOLD = [0, 1];

const getHeadingInfo = (el: {
  element: HTMLElement;
  level: HeadingLevel;
  text: string;
}): HeadingInfo => {
  const rect = el.element.getBoundingClientRect();
  return { ...el, top: rect.top };
};

const findParentH2Text = (
  h3Element: HTMLElement,
  headingsArray: { element: HTMLElement; level: HeadingLevel; text: string }[]
): string | null => {
  const h3Index = headingsArray.findIndex(h => h.element === h3Element);

  if (h3Index === -1) return null;

  for (let i = h3Index - 1; i >= 0; i--) {
    const el = headingsArray[i];
    if (!el) continue;

    if (el.level === 'h2') return el.text;
  }

  return null;
};

const formatActiveHeading = (
  heading: HeadingInfo,
  parentH2Text: string | null
): string => {
  if (heading.level === 'h2') return heading.text;
  return parentH2Text ? `${parentH2Text} > ${heading.text}` : heading.text;
};

/**
 * Hook to track the currently active heading (h2/h3) based on scroll position.
 * Uses TOCContext - must be used within TOCProvider.
 * Returns formatted text: "h2 title" or "h2 title > h3 title"
 */
export const useActiveHeading = (): string => {
  const registry = useTOCContext();
  const [activeHeading, setActiveHeading] = useState<string>('');

  useEffect(() => {
    if (!registry || registry.headings.length === 0) {
      return;
    }

    const headings = registry.headings;
    const visibleHeadings = new Map<HTMLElement, boolean>();

    const getVisibleHeadings = (): HeadingInfo[] => {
      return headings
        .filter(h => visibleHeadings.get(h.element))
        .map(getHeadingInfo)
        .sort((a, b) => a.top - b.top);
    };

    const getLastPassedHeading = (): HeadingInfo | null => {
      const passed = headings
        .map(getHeadingInfo)
        .filter(info => info.top < window.innerHeight * SCROLL_THRESHOLD)
        .sort((a, b) => b.top - a.top);

      return passed[0] ?? null;
    };

    const handleH3Activation = (h3Heading: HeadingInfo): void => {
      const parentH2Text = findParentH2Text(h3Heading.element, headings);
      setActiveHeading(formatActiveHeading(h3Heading, parentH2Text));
    };

    const updateActiveHeading = () => {
      const visible = getVisibleHeadings();

      if (visible.length === 0) {
        const lastPassed = getLastPassedHeading();

        if (!lastPassed) {
          setActiveHeading('');
          return;
        }

        if (lastPassed.level === 'h2') {
          setActiveHeading(lastPassed.text);
        } else {
          handleH3Activation(lastPassed);
        }
        return;
      }

      const topHeading = visible[0];

      if (!topHeading) {
        setActiveHeading('');
        return;
      }

      if (topHeading.level === 'h2') {
        const visibleH3 = visible.find((h, idx) => idx > 0 && h.level === 'h3');

        if (visibleH3) {
          setActiveHeading(`${topHeading.text} > ${visibleH3.text}`);
        } else {
          setActiveHeading(topHeading.text);
        }
      } else {
        handleH3Activation(topHeading);
      }
    };

    let rafId: number | null = null;
    const observer = new IntersectionObserver(
      entries => {
        entries.forEach(entry => {
          visibleHeadings.set(
            entry.target as HTMLElement,
            entry.isIntersecting
          );
        });
        if (rafId) cancelAnimationFrame(rafId);
        rafId = requestAnimationFrame(updateActiveHeading);
      }
      // {
      //   rootMargin: OBSERVER_ROOT_MARGIN,
      //   threshold: OBSERVER_THRESHOLD,
      // }
    );

    headings.forEach(h => observer.observe(h.element));

    return () => {
      headings.forEach(h => observer.unobserve(h.element));
    };
  }, [registry?.headings]);

  return activeHeading;
};
