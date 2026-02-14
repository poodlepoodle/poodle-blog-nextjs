import { create } from 'zustand';

/**
 * postTitle: 현재 화면에 보이는 포스트의 제목
 * activeHeading: 현재 화면 상에 보이는 부분의 헤딩 정보
 * isImageModalOpen: 포스트 내 MDX Image를 확대해서 보여주는 모달 상태
 * imageModalData: 모달에 표시할 이미지 데이터
 */

export type PostImage = {
  src: string;
  alt: string;
};

type PostState = {
  postTitle: string;
  activeHeading: string[];
  isImageModalOpen: boolean;
  imageModalData: PostImage | null;
};

type PostActions = {
  setPostTitle: (postTitle: string) => void;
  setActiveHeading: (activeHeading: string[]) => void;
  openImageModal: () => void;
  setImageModalData: (imageModalData: PostImage) => void;
  closeImageModal: () => void;
};

export type PostStore = PostState & PostActions;

const initialState: PostState = {
  postTitle: '',
  activeHeading: [],
  isImageModalOpen: false,
  imageModalData: null,
};

export const usePostStore = create<PostStore>(set => ({
  ...initialState,

  setPostTitle: postTitle => set({ postTitle }),

  setActiveHeading: activeHeading => set({ activeHeading }),

  openImageModal: () => set({ isImageModalOpen: true }),

  setImageModalData: imageModalData => set({ imageModalData }),

  closeImageModal: () => set(initialState),
}));
