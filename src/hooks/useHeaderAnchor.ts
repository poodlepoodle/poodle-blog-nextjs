import { useUIStore } from '@stores/ui-store';
import { useIntersectionObserver } from '@hooks/useIntersectionObserver';

export const useHeaderAnchor = () => {
  const setIsFloating = useUIStore(state => state.setIsFloating);
  const [headerAnchorRef] = useIntersectionObserver({
    numRefs: 1,
    setState: setIsFloating,
  });

  return { headerAnchorRef };
};
