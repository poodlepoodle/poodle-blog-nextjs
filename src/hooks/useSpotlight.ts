import { BlogContextType, useBlogContext } from '@contexts/BlogContext';
import useIntersectionObserver from '@hooks/useIntersectionObserver';

export default function useSpotlight() {
  const { setIsSpotlighted } = useBlogContext() as BlogContextType;
  const [headerRef, footerRef] = useIntersectionObserver({
    numRefs: 2,
    setState: setIsSpotlighted,
  });

  return {
    headerRef: headerRef as React.RefObject<HTMLDivElement>,
    footerRef: footerRef as React.RefObject<HTMLDivElement>,
  };
}
