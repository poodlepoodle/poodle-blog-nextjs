import { Skeleton } from '@components/common/skeleton';

export const MDXSkeleton = () => {
  return (
    <div className="my-post-paragraph flex w-full flex-col gap-post-paragraph px-[2.5rem] desktop:px-[5.5rem]">
      <div className="flex w-full flex-col gap-[1rem]">
        <div className="h-[1.25rem] w-[100%]">
          <Skeleton fill borderRadius={4} />
        </div>
        <div className="h-[1.25rem] w-[100%]">
          <Skeleton fill borderRadius={4} />
        </div>
        <div className="h-[1.25rem] w-[60%]">
          <Skeleton fill borderRadius={4} />
        </div>
      </div>
      <div className="flex w-full flex-col gap-[1rem]">
        <div className="h-[1.25rem] w-[100%]">
          <Skeleton fill borderRadius={4} />
        </div>
        <div className="h-[1.25rem] w-[100%]">
          <Skeleton fill borderRadius={4} />
        </div>
        <div className="h-[1.25rem] w-[60%]">
          <Skeleton fill borderRadius={4} />
        </div>
      </div>
    </div>
  );
};
