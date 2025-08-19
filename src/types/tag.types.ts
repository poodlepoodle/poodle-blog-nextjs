export interface TagCount {
  name: string;
  count: number;
}

export interface TagCountWithSelected extends TagCount {
  isSelected: boolean;
}
