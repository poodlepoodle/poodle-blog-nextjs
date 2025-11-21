import { useUIStore } from '@stores/ui-store';
import { useIntersectionObserver } from '@hooks/useIntersectionObserver';

export const useSpotlight = () => {
  const setIsSpotlighted = useUIStore(state => state.setIsSpotlighted);
  const [headerRef, footerRef] = useIntersectionObserver({
    numRefs: 2,
    setState: setIsSpotlighted,
  });

  return {
    headerRef: headerRef as React.RefObject<HTMLDivElement>,
    footerRef: footerRef as React.RefObject<HTMLDivElement>,
  };
};
