import { BlogContextType, useBlogContext } from '@contexts/BlogContext';
import useIntersectionObserver from '@hooks/useIntersectionObserver';

export default function useHeaderAnchor() {
  const { setIsFloating } = useBlogContext() as BlogContextType;
  const [headerAnchorRef] = useIntersectionObserver({
    numRefs: 1,
    setState: setIsFloating,
  });

  return { headerAnchorRef };
}
