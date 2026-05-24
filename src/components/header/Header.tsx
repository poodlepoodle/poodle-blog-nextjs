'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useId } from 'react';
import { AnimatePresence, motion } from 'motion/react';
import { cn } from '@/utils/cn';
import { HeaderNavigation } from './HeaderNavigation';
import { useUIStore } from '@stores/ui-store';

const FrostedNoise = () => {
  const filterId = useId();

  return (
    <svg
      aria-hidden
      className="pointer-events-none absolute inset-0 h-full w-full opacity-80 mix-blend-soft-light"
    >
      <filter id={filterId} colorInterpolationFilters="sRGB">
        <feTurbulence
          type="fractalNoise"
          baseFrequency="0.45 0.8"
          numOctaves="3"
          seed="7"
          stitchTiles="stitch"
        />
        <feColorMatrix
          type="matrix"
          values="0 0 0 0 1
                  0 0 0 0 1
                  0 0 0 0 1
                  0 0 0 0.08 0"
        />
      </filter>
      <rect width="100%" height="100%" filter={`url(#${filterId})`} />
    </svg>
  );
};

export const Header = () => {
  const isFloating = useUIStore(state => state.isFloating);
  const isSpotlighted = useUIStore(state => state.isSpotlighted);

  return (
    <AnimatePresence initial={false}>
      {!isSpotlighted && (
        <motion.header
          key="main-header"
          initial={{ opacity: 0, y: '-0.5rem' }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: '-0.5rem' }}
          transition={{ duration: 0.3 }}
          className={cn(
            'fixed top-0 z-header flex h-header w-full items-center justify-center border-b-[0.5px] bg-[rgba(255,255,255,0.05)] backdrop-blur-[0.65rem] backdrop-saturate-180 transition-colors duration-300',
            isFloating ? 'border-gray-2' : 'border-transparent'
          )}
        >
          <FrostedNoise />
          <div className="relative flex h-full w-full max-w-container items-center justify-between gap-[1.5rem] px-[2rem] tablet:px-[1.5rem] desktop:px-0">
            <Link
              href="/"
              className="relative h-[2.5rem] w-[2.5rem] opacity-100 transition-opacity duration-300 hover:opacity-50"
            >
              <Image
                src={`/components/header/wave.png`}
                alt="profile pic in top navigation"
                fill
                className="object-cover"
              />
            </Link>

            <HeaderNavigation />
          </div>
        </motion.header>
      )}
    </AnimatePresence>
  );
};
