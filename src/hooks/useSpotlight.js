import { useEffect, useRef } from 'react';
import { useBlogContext } from '@contexts/BlogContext';

export default function useSpotlight() {
  const headerRef = useRef(null);
  const footerRef = useRef(null);
  const { setIsSpotlighted } = useBlogContext();

  useEffect(() => {
    const handleIntersection = (entries) => {
      const isIntersectingContent = entries.every(
        (entry) => !entry.isIntersecting
      );
      setIsSpotlighted(isIntersectingContent);
    };

    const observer = new IntersectionObserver(handleIntersection, {
      threshold: 0,
    });

    if (headerRef.current) {
      observer.observe(headerRef.current);
    }
    if (footerRef.current) {
      observer.observe(footerRef.current);
    }

    return () => {
      if (headerRef.current) observer.unobserve(headerRef.current);
      if (footerRef.current) observer.unobserve(footerRef.current);
    };
  }, []);

  return { headerRef, footerRef };
}
