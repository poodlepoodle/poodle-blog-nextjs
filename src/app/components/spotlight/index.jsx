'use client';

import { useEffect } from 'react';
import useSpotlight from '@hooks/useSpotlight';

export default function Spotlight() {
  const spotlight = useSpotlight();

  const addSpotlight = () => document.body.classList.add('spotlighted');
  const removeSpotlight = () => document.body.classList.remove('spotlighted');

  useEffect(() => {
    if (spotlight) {
      addSpotlight();
    } else {
      removeSpotlight();
    }

    return () => {
      removeSpotlight();
    };
  }, [spotlight]);

  return <></>;
}
