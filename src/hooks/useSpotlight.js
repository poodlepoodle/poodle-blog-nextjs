import { useBlogContext } from '@contexts/BlogContext';
import useIntersectionObserver from '@hooks/useIntersectionObserver';

export default function useSpotlight() {
  const { setIsSpotlighted } = useBlogContext();
  const [headerRef, footerRef] = useIntersectionObserver(2, setIsSpotlighted);

  return { headerRef, footerRef };
}
