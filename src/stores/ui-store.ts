import { create } from 'zustand';

/**
 * isFloating: Header 컴포넌트의 페이지 상단 고정 여부
 * isSpotlighted: 포스트 내 Spotlight 효과 적용 여부
 */

type UIState = {
  isFloating: boolean;
  isSpotlighted: boolean;
};

type UIActions = {
  setIsFloating: (isFloating: boolean) => void;
  setIsSpotlighted: (isSpotlighted: boolean) => void;
};

export type UIStore = UIState & UIActions;

const initialState: UIState = {
  isFloating: false,
  isSpotlighted: false,
};

export const useUIStore = create<UIStore>(set => ({
  ...initialState,

  setIsFloating: isFloating => set({ isFloating }),

  setIsSpotlighted: isSpotlighted => set({ isSpotlighted }),
}));
