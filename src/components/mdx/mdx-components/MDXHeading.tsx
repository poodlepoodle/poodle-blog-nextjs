import { type ReactNode, type PropsWithChildren, isValidElement } from 'react';

type MDXHeadingProps = {
  children: ReactNode;
  id?: string;
};

const extractText = (children: ReactNode): string => {
  if (typeof children === 'string') {
    return children;
  }

  if (Array.isArray(children)) {
    return children.map(extractText).join('');
  }

  if (isValidElement<PropsWithChildren>(children)) {
    return extractText(children.props.children);
  }

  return '';
};

export const MDXH2 = ({ children, id }: MDXHeadingProps) => {
  const text = extractText(children);

  return (
    <h2 id={id} data-heading-level="h2" data-heading-text={text}>
      {children}
    </h2>
  );
};

export const MDXH3 = ({ children, id }: MDXHeadingProps) => {
  const text = extractText(children);

  return (
    <h3 id={id} data-heading-level="h3" data-heading-text={text}>
      {children}
    </h3>
  );
};
