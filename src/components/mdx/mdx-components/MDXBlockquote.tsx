type MDXBlockquoteProps = {
  children: React.ReactNode;
  props: React.HTMLAttributes<HTMLQuoteElement>;
};

export const MDXBlockquote = ({ children, ...props }: MDXBlockquoteProps) => {
  return (
    <blockquote
      {...props}
      className="border-l-[3px] border-gray-1 pl-[1.5rem] text-base leading-7 font-normal text-gray-3 not-italic"
    >
      {children}
    </blockquote>
  );
};
