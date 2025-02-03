import { useEffect, useRef } from 'react';

export default function useIntersectionObserver(numRefs, setState) {
  const refs = Array.from({ length: numRefs }, () => useRef(null));

  useEffect(() => {
    const handleIntersection = (entries) => {
      const isIntersectingAnchor = entries.every(
        (entry) => !entry.isIntersecting
      );
      setState(isIntersectingAnchor);
    };

    const observer = new IntersectionObserver(handleIntersection, {
      threshold: 0,
    });

    refs.forEach((ref) => {
      if (ref.current) observer.observe(ref.current);
    });

    return () => {
      refs.forEach((ref) => {
        if (ref.current) observer.unobserve(ref.current);
      });
    };
  }, []);

  return refs;
}
