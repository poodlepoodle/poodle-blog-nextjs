export interface PostMetadata {
  title: string;
  description: string;
  publishedAt: string;
  slug: string;
  tags: string[];
  updated: boolean;
  published?: boolean;
}

export interface Post extends PostMetadata {
  content: string;
}

export interface PlaygroundPostMetadata
  extends Omit<PostMetadata, 'description' | 'tags'> {}

export interface PlaygroundPost extends PlaygroundPostMetadata {
  content: string;
}
