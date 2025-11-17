import Image from 'next/image';

type ArticleFooterProps = {
  observerRef: React.RefObject<HTMLDivElement>;
  children: React.ReactNode;
};

export const ArticleFooter = ({
  observerRef,
  children,
}: ArticleFooterProps) => {
  return (
    <div
      ref={observerRef}
      className="flex w-full flex-col gap-[2rem] px-[2.5rem] desktop:px-[4rem]"
    >
      <div className="flex w-full items-end justify-end gap-[0.75rem] border-r-[3px] border-gray-1 pr-[1.5rem]">
        <div className="flex flex-col items-end gap-[0.05rem] pb-[0.1rem]">
          <span className="text-xs font-light text-gray-2">@poodlepoodle</span>
          <h6 className="text-sm font-normal text-black">Eojin Choi</h6>
        </div>
        <div className="transition-grayscale relative h-[2.6rem] w-[2.6rem] grayscale-100 duration-300 hover:grayscale-0">
          <Image
            src={`/components/article-footer/profile.png`}
            alt="article profile"
            fill
            className="rounded-full object-cover"
          />
        </div>
      </div>
      {children}
    </div>
  );
};
