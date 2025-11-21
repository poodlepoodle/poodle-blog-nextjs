import { create } from 'zustand';

/**
 * isImageModalOpen: 포스트 내 MDX Image를 확대해서 보여주는 모달 상태
 * imageModalData: 모달에 표시할 이미지 데이터
 */

type PostImage = {
  src: string;
  alt: string;
};

type PostState = {
  isImageModalOpen: boolean;
  imageModalData: PostImage | null;
};

type PostActions = {
  openImageModal: () => void;
  setImageModalData: (imageModalData: PostImage) => void;
  closeImageModal: () => void;
};

export type PostStore = PostState & PostActions;

const initialState: PostState = {
  isImageModalOpen: false,
  imageModalData: null,
};

export const usePostStore = create<PostStore>(set => ({
  ...initialState,

  openImageModal: () => set({ isImageModalOpen: true }),

  setImageModalData: imageModalData => set({ imageModalData }),

  closeImageModal: () => set(initialState),
}));
