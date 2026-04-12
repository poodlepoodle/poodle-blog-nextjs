const TWO_WEEKS_MS = 14 * 24 * 60 * 60 * 1000;

/**
 * `updatedAt` 날짜가 현재로부터 2주 이내인지 판별합니다.
 * @param updatedAt - 콘텐츠 수정일 (YYYY. MM. DD 형식). 문자열이 아니거나 없으면 false를 반환합니다.
 */
export function isRecentlyUpdated(updatedAt: unknown): boolean {
  if (typeof updatedAt !== 'string') return false;

  const updated = new Date(updatedAt.replace(/\.\s*/g, '-').trim());
  return Date.now() - updated.getTime() <= TWO_WEEKS_MS;
}
