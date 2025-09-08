import { create } from 'zustand';

/**
 * isFloating: Header 컴포넌트의 페이지 상단 고정 여부
 * headerText: Header 컴포넌트에서 표시하는 텍스트
 * isSpotlighted: 포스트 내 Spotlight 효과 적용 여부
 */

interface UIState {
  isFloating: boolean;
  headerText: string;
  isSpotlighted: boolean;
}

interface UIActions {
  setIsFloating: (isFloating: boolean) => void;
  setHeaderText: (headerText: string) => void;
  setIsSpotlighted: (isSpotlighted: boolean) => void;
}

export type UIStore = UIState & UIActions;

const initialState: UIState = {
  isFloating: false,
  headerText: '',
  isSpotlighted: false,
};

export const useUIStore = create<UIStore>(set => ({
  ...initialState,

  setIsFloating: isFloating => set({ isFloating }),

  setHeaderText: headerText => set({ headerText }),

  setIsSpotlighted: isSpotlighted => set({ isSpotlighted }),
}));
