type MDXInlineCodeProps = {
  children: React.ReactNode;
  className?: string;
  style?: React.CSSProperties;
} & React.HTMLAttributes<HTMLElement>;

export const MDXInlineCode = (props: MDXInlineCodeProps) => {
  if (!props) {
    return <code />;
  }

  const { children, className, style, ...rest } = props;

  if (style?.display === 'block') {
    return (
      <code className={className} style={style} {...rest}>
        {children}
      </code>
    );
  }

  return (
    <code
      className="vertical-middle mx-[0.1rem] inline-block translate-y-[-0.075rem] rounded-lg bg-[#EFF9FF] px-[5.5px] py-[1.5px] align-middle !font-mono !text-xs leading-[inherit] !font-medium text-[#176997] subpixel-antialiased before:content-[''] after:content-[''] tablet:py-[2.5px] tablet:!text-sm"
      {...rest}
    >
      {children}
    </code>
  );
};
