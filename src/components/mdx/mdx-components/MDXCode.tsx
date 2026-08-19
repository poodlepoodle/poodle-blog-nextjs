import { Code } from 'bright';

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

type MDXCodeProps = React.HTMLAttributes<HTMLElement>;

// bright가 <code> 엘리먼트에서 코드 문자열·언어를 직접 추출하므로 children을 그대로 넘긴다.
// 여기서 미리 벗겨내면 bright의 문자열 분기로 빠져 끝의 개행이 제거되지 않는다.
export const MDXCode = ({ children, ...props }: MDXCodeProps) => {
  return (
    <Code
      {...props}
      className="rounded-lg border-[0.5px] border-gray-2 text-base subpixel-antialiased tablet:text-lg"
    >
      {children}
    </Code>
  );
};
