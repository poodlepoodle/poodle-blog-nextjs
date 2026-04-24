'use client';

import { HEADER_MENU_ITEMS } from '@/constants';
import { usePathname } from 'next/navigation';
import { cn } from '@/utils/cn';
import Link from 'next/link';

export const HeaderNavigation = () => {
  const pathname = usePathname();

  return (
    <nav className="group hidden h-full shrink-0 items-center gap-items desktop:flex">
      {HEADER_MENU_ITEMS.map(({ label, href }) => (
        <Link
          key={href}
          href={href}
          className={cn(
            'flex h-full items-center text-black group-hover:text-gray-2 hover:text-black',
            pathname.startsWith(href) && 'text-skyblue'
          )}
        >
          <span className="text-sm font-semibold transition-colors duration-300">
            {label}
          </span>
        </Link>
      ))}
    </nav>
  );
};
