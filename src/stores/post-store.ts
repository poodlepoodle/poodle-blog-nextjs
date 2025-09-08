import type { ImageModal, ImageModalData } from '@/types';

import { create } from 'zustand';

/**
 * imageModal: 포스트 내 MDX Image를 확대해서 보여주는 모달 상태
 *   - isOpen: 모달 표시 여부
 *   - data: 모달에 표시할 이미지 데이터
 */

interface PostState {
  imageModal: ImageModal;
}

interface PostActions {
  openImageModal: (data: ImageModalData) => void;
  closeImageModal: () => void;
}

export type PostStore = PostState & PostActions;

const initialState: PostState = {
  imageModal: {
    isOpen: false,
    data: null,
  },
};

export const usePostStore = create<PostStore>(set => ({
  ...initialState,

  openImageModal: data => set({ imageModal: { isOpen: true, data } }),

  closeImageModal: () => set({ imageModal: { isOpen: false, data: null } }),
}));
