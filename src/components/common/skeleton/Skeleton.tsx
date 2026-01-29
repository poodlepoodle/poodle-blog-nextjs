import { cn } from '@/utils/cn';

type SkeletonBorderRadius = 0 | 4 | 8 | 16;

type SkeletonProps = {
  width?: string;
  height?: string;
  fill?: boolean;
  borderRadius?: SkeletonBorderRadius;
};

const borderRadiusToTailwind: Record<SkeletonBorderRadius, string> = {
  0: 'rounded-none',
  4: 'rounded',
  8: 'rounded-lg',
  16: 'rounded-2xl',
};

export const Skeleton = ({
  width = '100px',
  height = '100px',
  fill = false,
  borderRadius = 0,
}: SkeletonProps) => {
  return (
    <div
      className={cn(
        'relative overflow-hidden bg-gray-1 before:absolute before:inset-0 before:-translate-x-full before:animate-shimmer before:bg-gradient-to-r before:from-gray-1 before:via-white before:to-gray-1',
        borderRadiusToTailwind[borderRadius]
      )}
      style={
        fill
          ? {
              width: '100%',
              height: '100%',
            }
          : {
              width: width,
              height: height,
            }
      }
    ></div>
  );
};
