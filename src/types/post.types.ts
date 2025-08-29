interface CommonPostMetadata {
  title: string;
  description: string;
  publishedAt: string;
  slug: string;
  tags: string[];
  updated: boolean;
  published?: boolean;
}

export interface BlogPostMetadata extends CommonPostMetadata {}

export interface PlaygroundPostMetadata
  extends Omit<CommonPostMetadata, 'description' | 'tags'> {}

export interface BlogPost extends BlogPostMetadata {
  content: string;
}

export interface PlaygroundPost extends PlaygroundPostMetadata {
  content: string;
}

export type Post = BlogPost | PlaygroundPost;
