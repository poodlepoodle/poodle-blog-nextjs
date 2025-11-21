import { useEffect, useRef } from 'react';

type UseIntersectionObserverProps = {
  numRefs: number;
  setState: (state: boolean) => void;
};

export const useIntersectionObserver = ({
  numRefs,
  setState,
}: UseIntersectionObserverProps) => {
  const refsArray = useRef<Array<React.RefObject<HTMLElement | null>>>([]);
  const intersectionStatesRef = useRef(new Map());
  const isInitialMountRef = useRef(true);

  if (!refsArray.current || refsArray.current.length !== numRefs) {
    refsArray.current = Array.from({ length: numRefs }, () => ({
      current: null,
    }));
  }

  useEffect(() => {
    const refs = refsArray.current;
    if (!refs) return;

    const handleIntersection = (entries: IntersectionObserverEntry[]) => {
      entries.forEach(entry => {
        const refIndex = refs.findIndex(ref => ref.current === entry.target);
        if (refIndex !== -1) {
          intersectionStatesRef.current.set(refIndex, entry.isIntersecting);
        }
      });

      if (intersectionStatesRef.current.size === numRefs) {
        const allNotIntersecting = Array.from(
          intersectionStatesRef.current.values()
        ).every(isIntersecting => !isIntersecting);

        if (isInitialMountRef.current) {
          setTimeout(() => {
            setState(allNotIntersecting);
            isInitialMountRef.current = false;
          }, 100);
        } else {
          setState(allNotIntersecting);
        }
      }
    };

    const observer = new IntersectionObserver(handleIntersection, {
      threshold: 0,
    });

    const startObserving = () => {
      refs.forEach(ref => {
        if (ref.current) {
          observer.observe(ref.current);
        }
      });
    };

    setTimeout(startObserving, 0);

    return () => {
      refs.forEach(ref => {
        if (ref.current) observer.unobserve(ref.current);
      });
    };
  }, [numRefs, setState]);

  return refsArray.current || [];
};
