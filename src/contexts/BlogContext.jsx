'use client';
import { createContext, useState, useContext } from 'react';

const BlogContext = createContext(null);

export function BlogContextProvider({ children }) {
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
