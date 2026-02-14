import { HEADER_MENU_ITEMS } from '@/constants';
import { usePathname } from 'next/navigation';
import { cn } from '@/utils/cn';

import Link from 'next/link';

export const HeaderNavigation = () => {
  const pathname = usePathname();

  return (
    <nav className="flex h-full shrink-0 items-center gap-items">
      {HEADER_MENU_ITEMS.map(({ label, href }) => (
        <Link key={href} href={href} className="group flex h-full items-center">
          <span
            className={cn(
              'text-sm font-semibold transition-colors duration-300 group-hover:text-skyblue',
              pathname.startsWith(href) ? 'text-skyblue' : 'text-black'
            )}
          >
            {label}
          </span>
        </Link>
      ))}
    </nav>
  );
};
