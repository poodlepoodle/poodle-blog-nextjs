import { useBlogContext } from '@contexts/BlogContext';
import useIntersectionObserver from '@hooks/useIntersectionObserver';

export default function useHeaderAnchor() {
  const { setIsFloating } = useBlogContext();
  const [headerAnchorRef] = useIntersectionObserver(1, setIsFloating);

  return { headerAnchorRef };
}
