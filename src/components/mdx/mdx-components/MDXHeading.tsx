'use client';

import {
  type ReactNode,
  type PropsWithChildren,
  isValidElement,
  useCallback,
  useRef,
} from 'react';

import { useTOCContext } from '@/contexts/toc-context';

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

const useHeadingRef = (
  level: 'h2' | 'h3',
  text: string
): React.RefCallback<HTMLHeadingElement> => {
  const registry = useTOCContext();
  const registryRef = useRef(registry);
  const elementRef = useRef<HTMLElement | null>(null);

  registryRef.current = registry;

  return useCallback(
    (element: HTMLHeadingElement | null) => {
      if (elementRef.current && registryRef.current) {
        registryRef.current.unregisterHeading(elementRef.current);
      }

      if (element && registryRef.current) {
        elementRef.current = element;
        registryRef.current.registerHeading({ element, level, text });
      } else {
        elementRef.current = null;
      }
    },
    [level, text]
  );
};

export const MDXH2 = ({ children, id }: MDXHeadingProps) => {
  const text = extractText(children);
  const ref = useHeadingRef('h2', text);

  return (
    <h2 ref={ref} id={id} data-heading-level="h2" data-heading-text={text}>
      {children}
    </h2>
  );
};

export const MDXH3 = ({ children, id }: MDXHeadingProps) => {
  const text = extractText(children);
  const ref = useHeadingRef('h3', text);

  return (
    <h3 ref={ref} id={id} data-heading-level="h3" data-heading-text={text}>
      {children}
    </h3>
  );
};
