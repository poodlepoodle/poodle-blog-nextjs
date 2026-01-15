export const CommonComponentLayout = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  return (
    <div className="flex overflow-hidden rounded-lg border-[0.5px] border-gray-2">
      {children}
    </div>
  );
};
