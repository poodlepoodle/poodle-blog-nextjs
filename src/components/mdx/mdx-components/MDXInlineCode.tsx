export const MDXInlineCode = (props: any) => {
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
      className="mx-[0.1rem] inline-block translate-y-[-0.1rem] rounded-lg border-[0.5px] border-[#BDE4F9] bg-[#EFF9FF] px-[0.35rem] py-[0.1rem] align-middle !font-mono !text-xs leading-[inherit] font-medium text-[#176997] before:content-[''] after:content-[''] tablet:py-[0.15rem] tablet:!text-sm"
      {...rest}
    >
      {children}
    </code>
  );
};
