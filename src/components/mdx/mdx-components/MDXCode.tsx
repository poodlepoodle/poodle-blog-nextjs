import { Code } from 'bright';
import { isValidElement } from 'react';

Code.theme = 'min-light';
Code.lineNumbers = true;
Code.extensions = [
  {
    name: 'focus',
    MultilineAnnotation: ({ children }) => (
      <div className="bg-[#EFF9FFCC]">{children}</div>
    ),
    beforeHighlight: (props: any, focusAnnotations: any[]) => {
      if (focusAnnotations.length === 0) return props;

      const lines = props.code.split('\n');
      const linesToFocus = new Set();

      focusAnnotations.forEach((a: any) => {
        for (let i = a.fromLineNumber; i <= a.toLineNumber; i++) {
          linesToFocus.add(i);
        }
      });

      const filteredLines = lines.filter((line: string) => {
        const trimmed = line.trim();
        return !(
          trimmed.startsWith('// focus') || trimmed.startsWith('//focus')
        );
      });

      return {
        ...props,
        code: filteredLines.join('\n'),
      };
    },
  },
];

type MDXCodeProps = {
  children: React.ReactNode;
  props: React.HTMLAttributes<HTMLElement>;
};

export const MDXCode = ({ children, ...props }: MDXCodeProps) => {
  let codeContent = children;
  let lang: string | undefined = undefined;

  if (isValidElement(children)) {
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
      className="rounded-lg border-[0.5px] border-gray-2 text-base subpixel-antialiased tablet:text-lg"
    >
      {codeContent}
    </Code>
  );
};
