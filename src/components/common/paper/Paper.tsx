type PaperProps = {
  children: React.ReactNode;
  className?: string;
};

export const Paper = ({ children, className }: PaperProps) => (
  <div className={`w-full max-w-container rounded-2xl bg-white ${className}`}>
    {children}
  </div>
);
