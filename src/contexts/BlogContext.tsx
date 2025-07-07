'use client';

import type {
  ImageModal,
  ImageModalData,
  BlogContextProviderProps,
  BlogContextType,
} from './types';

import { createContext, useState, useContext } from 'react';

const BlogContext = createContext<BlogContextType | null>(null);

export function BlogContextProvider({ children }: BlogContextProviderProps) {
  const [isFloating, setIsFloating] = useState<boolean>(false);
  const [isSpotlighted, setIsSpotlighted] = useState<boolean>(false);
  const [headerText, setHeaderText] = useState<string>('');
  const [imageModal, setImageModal] = useState<ImageModal>({
    isOpen: false,
    data: null,
  });

  const openImageModal = (data: ImageModalData) => {
    setImageModal({
      isOpen: true,
      data,
    });
  };

  const closeImageModal = () => {
    setImageModal({
      isOpen: false,
      data: null,
    });
  };

  return (
    <BlogContext.Provider
      value={{
        isFloating,
        setIsFloating,
        isSpotlighted,
        setIsSpotlighted,
        headerText,
        setHeaderText,
        imageModal,
        openImageModal,
        closeImageModal,
      }}
    >
      {children}
    </BlogContext.Provider>
  );
}

export function useBlogContext() {
  return useContext(BlogContext);
}
