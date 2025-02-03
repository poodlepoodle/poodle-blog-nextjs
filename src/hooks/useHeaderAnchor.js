import { useEffect, useRef } from 'react';
import { useBlogContext } from '@contexts/BlogContext';

export default function useHeaderAnchor() {
  const headerAnchorRef = useRef(null);
  const { setIsFloating } = useBlogContext();

  useEffect(() => {
    const handleIntersection = (entries) => {
      const isIntersectingAnchor = entries.every(
        (entry) => !entry.isIntersecting
      );
      setIsFloating(isIntersectingAnchor);
    };

    const observer = new IntersectionObserver(handleIntersection, {
      threshold: 0,
    });

    if (headerAnchorRef.current) {
      observer.observe(headerAnchorRef.current);
    }

    return () => {
      if (headerAnchorRef.current) observer.unobserve(headerAnchorRef.current);
    };
  }, []);

  return { headerAnchorRef };
}
