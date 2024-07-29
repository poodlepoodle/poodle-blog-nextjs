import { useState, useEffect } from 'react';

export default function useSpotlight() {
  const [spotlight, setSpotlight] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const totalHeight = document.documentElement.scrollHeight;
      const viewportHeight =
        window.innerHeight || document.documentElement.clientHeight;
      const scrollStart = 0;
      const scrollEnd = totalHeight - viewportHeight;
      const scrollThreshold = viewportHeight;

      const scroll = window.scrollY || document.documentElement.scrollTop;
      const isContentScrolled =
        scroll > scrollStart + scrollThreshold &&
        scroll < scrollEnd - scrollThreshold;

      setSpotlight(isContentScrolled);
    };
    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return spotlight;
}
