/**
 * 한국어 날짜 형식 (YYYY. MM. DD)을 ISO 8601 형식으로 변환합니다.
 * ex) '2024. 03. 13' -> '2024-03-13T00:00:00.000Z'
 */
export const convertToISODate = (koreanDate: string): string => {
  const cleanDate = koreanDate.replace(/\.\s*/g, '-').trim();
  const date = new Date(cleanDate);
  return date.toISOString();
};
