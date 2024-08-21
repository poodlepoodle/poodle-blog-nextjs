import { useEffect, useState, useRef } from 'react';

export default function useSpotlight() {
  const headerRef = useRef(null);
  const footerRef = useRef(null);
  const [spotlighted, setSpotlighted] = useState(false);

  useEffect(() => {
    const handleIntersection = (entries) => {
      const isIntersectingContent = entries.every(
        (entry) => !entry.isIntersecting
      );
      setSpotlighted(isIntersectingContent);
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

  return { headerRef, footerRef, spotlighted };
}
