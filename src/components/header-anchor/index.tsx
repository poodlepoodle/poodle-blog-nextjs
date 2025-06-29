'use client';

import useHeaderAnchor from '@hooks/useHeaderAnchor';

export default function HeaderAnchor() {
  const { headerAnchorRef } = useHeaderAnchor();

  return <div ref={headerAnchorRef}></div>;
}
