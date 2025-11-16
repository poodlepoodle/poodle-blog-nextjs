import Link from 'next/link';
import Icon from '@components/icon';

const ArrowIcon = () => {
  return (
    <Icon width={6} height={6} color="#131926">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="6"
        height="6"
        viewBox="0 0 6 6"
        fill="none"
      >
        <path
          d="M0.718686 6L0 5.28131L4.25767 1.02364H0.476837V0H6V5.52316H4.97636V1.74233L0.718686 6Z"
          fill="#131926"
        />
      </svg>
    </Icon>
  );
};

export const Footer = () => {
  return (
    <footer className="flex h-footer w-full shrink-0 justify-center border-t-[0.5px] border-gray-2 bg-gray-1">
      <div className="flex w-full max-w-container items-center justify-between px-[2.5rem] desktop:px-0">
        <section className="text-sm font-normal text-gray-3">
          ⓒ Eojin Choi 2025
        </section>

        <nav className="flex h-full items-center gap-items">
          <Link
            className="flex items-center gap-[0.35rem] opacity-100 transition-opacity duration-300 hover:opacity-50"
            href={`mailto: chammal97@naver.com`}
            target="_blank"
          >
            <span className="text-sm font-normal text-black">email</span>
            <ArrowIcon />
          </Link>
          <Link
            className="flex items-center gap-[0.35rem] opacity-100 transition-opacity duration-300 hover:opacity-50"
            href={`https://github.com/poodlepoodle`}
            target="_blank"
          >
            <span className="text-sm font-normal text-black">github</span>
            <ArrowIcon />
          </Link>
        </nav>
      </div>
    </footer>
  );
};
