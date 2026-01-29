import { cn } from '@/utils/cn';

type PaperProps = {
  children: React.ReactNode;
  className?: string;
};

export const Paper = ({ children, className }: PaperProps) => (
  <div className={cn('w-full max-w-container rounded-2xl bg-white', className)}>
    {children}
  </div>
);
