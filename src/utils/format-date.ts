/**
 * 한국어 날짜 형식 (YYYY. MM. DD)을 ISO 8601 형식으로 변환합니다.
 * ex) '2024. 03. 13' -> '2024-03-13T00:00:00.000Z'
 */
export const convertToISODate = (koreanDate: string): string => {
  const cleanDate = koreanDate.replace(/\.\s*/g, '-').trim();
  const date = new Date(cleanDate);
  return date.toISOString();
};

/**
 * 포스트의 실제 수정일을 ISO 8601 형식으로 반환합니다.
 * `updatedAt`이 있으면 우선 사용하고, 없으면 `publishedAt`을 fallback 값으로 사용합니다.
 */
export const getPostLastModifiedIso = (post: {
  publishedAt: string;
  updatedAt?: string;
}): string => convertToISODate(post.updatedAt ?? post.publishedAt);
