'use client';
import { createContext, useState, useContext } from 'react';

export type BlogContextType = {
  isFloating: boolean;
  setIsFloating: (isFloating: boolean) => void;
  isSpotlighted: boolean;
  setIsSpotlighted: (isSpotlighted: boolean) => void;
  headerText: string;
  setHeaderText: (headerText: string) => void;
};

const BlogContext = createContext<BlogContextType | null>(null);

interface BlogContextProviderProps {
  children: React.ReactNode;
}

export function BlogContextProvider({ children }: BlogContextProviderProps) {
  const [isFloating, setIsFloating] = useState<boolean>(false);
  const [isSpotlighted, setIsSpotlighted] = useState<boolean>(false);
  const [headerText, setHeaderText] = useState<string>('');

  return (
    <BlogContext.Provider
      value={{
        isFloating,
        setIsFloating,
        isSpotlighted,
        setIsSpotlighted,
        headerText,
        setHeaderText,
      }}
    >
      {children}
    </BlogContext.Provider>
  );
}

export function useBlogContext() {
  return useContext(BlogContext);
}
