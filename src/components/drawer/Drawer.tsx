'use client';

import { HEADER_MENU_ITEMS } from '@/constants';
import { usePathname } from 'next/navigation';
import { useUIStore } from '@stores/ui-store';
import { memo, useEffect } from 'react';
import { cn } from '@/utils/cn';
import Link from 'next/link';

const MenuIcon = memo(() => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="22"
    height="22"
    viewBox="0 0 24 24"
    fill="none"
    className="shrink-0"
  >
    <path
      d="M4 18C3.71667 18 3.47917 17.9042 3.2875 17.7125C3.09583 17.5208 3 17.2833 3 17C3 16.7167 3.09583 16.4792 3.2875 16.2875C3.47917 16.0958 3.71667 16 4 16H20C20.2833 16 20.5208 16.0958 20.7125 16.2875C20.9042 16.4792 21 16.7167 21 17C21 17.2833 20.9042 17.5208 20.7125 17.7125C20.5208 17.9042 20.2833 18 20 18H4ZM4 13C3.71667 13 3.47917 12.9042 3.2875 12.7125C3.09583 12.5208 3 12.2833 3 12C3 11.7167 3.09583 11.4792 3.2875 11.2875C3.47917 11.0958 3.71667 11 4 11H20C20.2833 11 20.5208 11.0958 20.7125 11.2875C20.9042 11.4792 21 11.7167 21 12C21 12.2833 20.9042 12.5208 20.7125 12.7125C20.5208 12.9042 20.2833 13 20 13H4ZM4 8C3.71667 8 3.47917 7.90417 3.2875 7.7125C3.09583 7.52083 3 7.28333 3 7C3 6.71667 3.09583 6.47917 3.2875 6.2875C3.47917 6.09583 3.71667 6 4 6H20C20.2833 6 20.5208 6.09583 20.7125 6.2875C20.9042 6.47917 21 6.71667 21 7C21 7.28333 20.9042 7.52083 20.7125 7.7125C20.5208 7.90417 20.2833 8 20 8H4Z"
      className="fill-black"
    />
  </svg>
));

const CloseIcon = memo(() => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="22"
    height="22"
    viewBox="0 0 24 24"
    fill="none"
    className="shrink-0"
  >
    <path
      d="M12 13.3998L7.10005 18.2998C6.91672 18.4831 6.68338 18.5748 6.40005 18.5748C6.11672 18.5748 5.88338 18.4831 5.70005 18.2998C5.51672 18.1165 5.42505 17.8831 5.42505 17.5998C5.42505 17.3165 5.51672 17.0831 5.70005 16.8998L10.6 11.9998L5.70005 7.0998C5.51672 6.91647 5.42505 6.68314 5.42505 6.3998C5.42505 6.11647 5.51672 5.88314 5.70005 5.6998C5.88338 5.51647 6.11672 5.4248 6.40005 5.4248C6.68338 5.4248 6.91672 5.51647 7.10005 5.6998L12 10.5998L16.9 5.6998C17.0834 5.51647 17.3167 5.4248 17.6 5.4248C17.8834 5.4248 18.1167 5.51647 18.3 5.6998C18.4834 5.88314 18.575 6.11647 18.575 6.3998C18.575 6.68314 18.4834 6.91647 18.3 7.0998L13.4 11.9998L18.3 16.8998C18.4834 17.0831 18.575 17.3165 18.575 17.5998C18.575 17.8831 18.4834 18.1165 18.3 18.2998C18.1167 18.4831 17.8834 18.5748 17.6 18.5748C17.3167 18.5748 17.0834 18.4831 16.9 18.2998L12 13.3998Z"
      className="fill-black"
    />
  </svg>
));

export const Drawer = () => {
  const pathname = usePathname();
  const isSpotlighted = useUIStore(state => state.isSpotlighted);
  const isDrawerOpen = useUIStore(state => state.isDrawerOpen);
  const closeDrawer = useUIStore(state => state.closeDrawer);
  const openDrawer = useUIStore(state => state.openDrawer);

  useEffect(() => {
    if (isSpotlighted) {
      closeDrawer();
    }

    return () => {
      closeDrawer();
    };
  }, [isSpotlighted]);

  useEffect(() => {
    document.body.style.overflow = isDrawerOpen ? 'hidden' : '';

    return () => {
      document.body.style.overflow = '';
    };
  }, [isDrawerOpen]);

  return (
    <>
      {!isSpotlighted && isDrawerOpen && (
        <div
          className="fixed top-0 right-0 z-dimmed flex h-full w-full animate-fade-in bg-black/50 desktop:hidden"
          onClick={closeDrawer}
        >
          <div className="fixed top-0 right-0 z-drawer h-full w-full max-w-[15rem] min-w-[10rem] animate-fade-in-left rounded-l-xl bg-white pt-header">
            <nav
              className="flex h-full shrink-0 flex-col items-center gap-[2rem] p-[2.5rem]"
              onClick={e => {
                e.stopPropagation();
                closeDrawer();
              }}
            >
              {HEADER_MENU_ITEMS.map(({ label, href }) => (
                <Link
                  key={href}
                  href={href}
                  className="group flex w-full items-center py-[0.5rem]"
                >
                  <span
                    className={cn(
                      'w-full text-right text-lg font-semibold transition-colors duration-300 group-hover:text-skyblue',
                      pathname.startsWith(href) ? 'text-skyblue' : 'text-black'
                    )}
                  >
                    {label}
                  </span>
                </Link>
              ))}
            </nav>
          </div>
        </div>
      )}
      {!isSpotlighted && (
        <div className="fixed top-0 right-0 z-drawer flex h-header items-center desktop:hidden">
          <button
            className="mr-[1.5rem] animate-fade-in p-[0.5rem] tablet:mr-[1rem]"
            onClick={isDrawerOpen ? closeDrawer : openDrawer}
          >
            {isDrawerOpen ? <CloseIcon /> : <MenuIcon />}
          </button>
        </div>
      )}
    </>
  );
};
