'use client';

import useHeaderAnchor from '@hooks/useHeaderAnchor';

export const HeaderAnchor = () => {
  const { headerAnchorRef } = useHeaderAnchor();
  return <div ref={headerAnchorRef as React.RefObject<HTMLDivElement>}></div>;
};
