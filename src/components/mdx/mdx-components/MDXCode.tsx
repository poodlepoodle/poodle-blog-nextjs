import { Code } from 'bright';

Code.theme = 'min-light';
Code.lineNumbers = true;

type MDXCodeProps = {
  children: React.ReactNode;
  props: React.HTMLAttributes<HTMLElement>;
};

export const MDXCode = ({ children, ...props }: MDXCodeProps) => {
  let codeContent = children;
  let lang: string | undefined = undefined;

  if (
    children &&
    typeof children === 'object' &&
    'props' in children &&
    children.props
  ) {
    const childProps = children.props as {
      children?: React.ReactNode;
      className?: string;
    };

    codeContent = childProps.children;

    if (childProps.className) {
      const match = childProps.className.match(/language-(\w+)/);
      if (match) {
        lang = match[1];
      }
    }
  }

  return (
    <Code
      {...props}
      lang={lang}
      className="rounded-lg border-[0.5px] border-gray-2 text-base tablet:text-lg"
    >
      {codeContent}
    </Code>
  );
};
