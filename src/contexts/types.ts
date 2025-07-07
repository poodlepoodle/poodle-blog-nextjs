export interface ImageModalData {
  src: string;
  alt: string;
}

export interface ImageModal {
  isOpen: boolean;
  data: ImageModalData | null;
}

export interface BlogContextProviderProps {
  children: React.ReactNode;
}

export type BlogContextType = {
  /* Header 컴포넌트 고정 시 효과와 관련된 */
  isFloating: boolean;
  setIsFloating: (isFloating: boolean) => void;
  /* Spotlight 효과와 관련된 */
  isSpotlighted: boolean;
  setIsSpotlighted: (isSpotlighted: boolean) => void;
  /* Header 컴포넌트 텍스트와 관련된 */
  headerText: string;
  setHeaderText: (headerText: string) => void;
  /* 포스트 내 MDX Image 모달 관련 */
  imageModal: ImageModal;
  openImageModal: (data: ImageModalData) => void;
  closeImageModal: () => void;
};
