import { Code } from 'bright';

Code.theme = 'min-light';
Code.lineNumbers = true;

type MDXCodeProps = {
  children: React.ReactNode;
  props: React.HTMLAttributes<HTMLElement>;
};

export const MDXCode = ({ children, ...props }: MDXCodeProps) => {
  return (
    <Code
      {...props}
      className="rounded-lg border-[0.5px] border-gray-2 text-base tablet:text-lg"
    >
      {children}
    </Code>
  );
};
