import { unstable_cache } from 'next/cache';

/**
 * 빌드(프로덕션)에서는 `unstable_cache`로 콜백을 영구 캐싱합니다.
 * 개발 환경에서는 적용하지 않습니다.
 */
export const withProductionCache = <T>(fn: () => Promise<T>, keys: string[]) =>
  process.env.NODE_ENV === 'development'
    ? fn
    : unstable_cache(fn, keys, { revalidate: false });
