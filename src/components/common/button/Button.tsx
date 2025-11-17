import Link from 'next/link';

type ButtonProps = {
  label: string;
  href?: string;
  replace?: boolean;
  onClick?: () => void;
};

export const Button = ({
  href,
  label,
  replace = false,
  onClick,
}: ButtonProps) => {
  if (onClick) {
    return (
      <button
        className="flex h-[2.25rem] w-fit min-w-[7.5rem] items-center justify-center rounded-xl border-[0.5px] border-gray-2 px-[1.5rem] transition-all duration-300 hover:border-transparent hover:bg-black hover:text-white"
        onClick={onClick}
      >
        <span className="text-sm font-medium">{label}</span>
      </button>
    );
  }

  return (
    <Link
      href={href ?? '/'}
      replace={replace}
      className="flex h-[2.25rem] w-fit min-w-[7.5rem] items-center justify-center rounded-xl border-[0.5px] border-gray-2 px-[1.5rem] transition-all duration-300 hover:border-transparent hover:bg-black hover:text-white"
    >
      <span className="text-sm font-medium">{label}</span>
    </Link>
  );
};
