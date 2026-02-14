'use client';

import {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useRef,
  useState,
  type ReactNode,
} from 'react';

export type HeadingLevel = 'h2' | 'h3';

export type RegisteredHeading = {
  element: HTMLElement;
  level: HeadingLevel;
  text: string;
};

type TOCContextType = {
  headings: RegisteredHeading[];
  registerHeading: (heading: RegisteredHeading) => void;
  unregisterHeading: (element: HTMLElement) => void;
};

const TOCContext = createContext<TOCContextType | null>(null);

export const useTOCContext = () => {
  const context = useContext(TOCContext);

  if (!context) {
    return null;
  }

  return context;
};

type TOCProviderProps = {
  children: ReactNode;
};

export const TOCProvider = ({ children }: TOCProviderProps) => {
  const [headings, setHeadings] = useState<RegisteredHeading[]>([]);
  const headingsRef = useRef<RegisteredHeading[]>([]);

  const registerHeading = useCallback((heading: RegisteredHeading) => {
    headingsRef.current = [...headingsRef.current, heading];
    setHeadings(headingsRef.current);
  }, []);

  const unregisterHeading = useCallback((element: HTMLElement) => {
    headingsRef.current = headingsRef.current.filter(
      h => h.element !== element
    );
    setHeadings(headingsRef.current);
  }, []);

  const value = useMemo<TOCContextType>(
    () => ({
      headings,
      registerHeading,
      unregisterHeading,
    }),
    [headings, registerHeading, unregisterHeading]
  );

  return <TOCContext.Provider value={value}>{children}</TOCContext.Provider>;
};
