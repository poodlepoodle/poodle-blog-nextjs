type MDXInlineCodeProps = React.HTMLAttributes<HTMLElement>;

export const MDXInlineCode = ({ children, ...rest }: MDXInlineCodeProps) => {
  return (
    <code
      {...rest}
      className="vertical-middle mx-[0.1rem] inline-block translate-y-[-0.07rem] rounded-md bg-[#EFF9FF] px-[5px] py-[1px] align-middle !font-mono !text-xs leading-[inherit] !font-medium text-[#176997] subpixel-antialiased before:content-[''] after:content-[''] tablet:translate-y-[-0.08rem] tablet:rounded-lg tablet:py-[1.5px] tablet:!text-sm"
    >
      {children}
    </code>
  );
};
