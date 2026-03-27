/**
 * Common Post Metadata
 * @description 포스트 공통 메타데이터
 */
interface CommonPostMetadata {
  title: string;
  description: string;
  publishedAt: string;
  updatedAt?: string; // 콘텐츠 수정일 (YYYY. MM. DD). 생략 시 publishedAt을 수정일로 사용합니다.
  slug: string;
  tags: string[];
  updated: boolean;
  published?: boolean;
}

/**
 * Blog Post Metadata
 * @description 블로그 포스트 메타데이터
 */
export interface BlogPostMetadata extends CommonPostMetadata {}
export interface BlogPost extends BlogPostMetadata {
  type: 'blog';
  content: string;
}

/**
 * Playground Post Metadata
 * @description 플레이그라운드 포스트 메타데이터
 */
export interface PlaygroundPostMetadata
  extends Omit<CommonPostMetadata, 'description' | 'tags'> {}
export interface PlaygroundPost extends PlaygroundPostMetadata {
  type: 'playground';
  content: string;
}

/**
 * Log Post Metadata
 * @description 로그 포스트 메타데이터
 */
export interface LogPostMetadata extends Omit<CommonPostMetadata, 'tags'> {}
export interface LogPost extends LogPostMetadata {
  type: 'log';
  content: string;
}

export type Post = BlogPost | PlaygroundPost | LogPost;
