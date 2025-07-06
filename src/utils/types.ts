export interface Metadata {
  title: string;
  publishedAt: string;
  description: string;
  slug: string;
  tags: string[];
  updated: boolean;
  published?: boolean;
}

export interface Post extends Metadata {
  content: string;
}

export interface TagCount {
  name: string;
  count: number;
}
