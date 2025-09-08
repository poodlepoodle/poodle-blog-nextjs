export interface ImageModal {
  isOpen: boolean;
  data: ImageModalData | null;
}

export interface ImageModalData {
  src: string;
  alt: string;
}
