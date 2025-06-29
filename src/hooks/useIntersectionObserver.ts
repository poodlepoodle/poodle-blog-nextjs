import { useEffect, useRef } from 'react';

type UseIntersectionObserverProps = {
  numRefs: number;
  setState: (state: boolean) => void;
};

export default function useIntersectionObserver({
  numRefs,
  setState,
}: UseIntersectionObserverProps) {
  const refs = Array.from({ length: numRefs }, () => useRef(null));
  const intersectionStatesRef = useRef(new Map());
  const isInitialMountRef = useRef(true);

  useEffect(() => {
    const handleIntersection = (entries: IntersectionObserverEntry[]) => {
      // 각 요소의 intersection 상태를 개별적으로 업데이트
      entries.forEach(entry => {
        const refIndex = refs.findIndex(ref => ref.current === entry.target);
        if (refIndex !== -1) {
          intersectionStatesRef.current.set(refIndex, entry.isIntersecting);
        }
      });

      // 모든 ref의 상태가 업데이트되었는지 확인
      if (intersectionStatesRef.current.size === numRefs) {
        const allNotIntersecting = Array.from(
          intersectionStatesRef.current.values()
        ).every(isIntersecting => !isIntersecting);

        // 초기 마운트 시에는 약간의 지연을 두어 DOM이 안정화되도록 함
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

    // DOM이 완전히 렌더링된다면 약간의 지연 후에 관찰 시작
    const startObserving = () => {
      refs.forEach(ref => {
        if (ref.current) {
          observer.observe(ref.current);
        }
      });
    };

    // 다음 tick에 관찰 시작
    setTimeout(startObserving, 0);

    return () => {
      refs.forEach(ref => {
        if (ref.current) observer.unobserve(ref.current);
      });
    };
  }, []);

  return refs;
}
