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

type BlogContextProviderProps = {
  children: React.ReactNode;
};

const BlogContext = createContext<BlogContextType | null>(null);

export function BlogContextProvider({ children }: BlogContextProviderProps) {
  const [isFloating, setIsFloating] = useState(false);
  const [isSpotlighted, setIsSpotlighted] = useState(false);
  const [headerText, setHeaderText] = useState('');

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
