import { NextResponse, type NextRequest } from 'next/server';

/**
 * `REQUEST_LOGGING_ENABLED=true`인 환경에서 모든 서버 요청을 구조화 로그로 남기는
 * 운영 관측 지점이다. 로컬 개발 환경에서는 이 변수를 설정하지 않아 로그를 남기지 않는다.
 *
 * 특히 Agent 콘텐츠 협상은 User-Agent 목록이 아니라 `Accept: text/markdown`
 * 요청에만 반응한다. 이 로그는 실제 클라이언트가 보낸 Accept 값을 확인하고
 * 현재 rewrite 규칙이 Markdown 응답으로 분기했는지 검증하기 위한 것이다.
 * User-Agent를 포함한 다른 헤더는 관측 목적으로만 기록하며, 응답 형식 결정에는
 * 사용하지 않는다.
 *
 * Proxy는 next.config.ts의 beforeFiles rewrite보다 먼저 실행되므로, rewrite되기 전의
 * 원본 요청 헤더와 경로를 기록할 수 있다. 쿠키, 인증 정보, API 키, IP/위치 정보처럼
 * 민감할 수 있는 값은 로그에 남기지 않고 마스킹한다.
 */
const markdownAcceptPattern = /(.*)text\/markdown(.*)/;
const contentPaths = /^\/(posts|logs|playgrounds)\/[^/.]+$/;
const shouldLogRequests = process.env.REQUEST_LOGGING_ENABLED === 'true';
const sensitiveHeaders = new Set([
  'authorization',
  'cookie',
  'forwarded',
  'proxy-authorization',
  'x-api-key',
  'x-forwarded-for',
  'x-real-ip',
  'x-vercel-ip-city',
  'x-vercel-ip-country',
  'x-vercel-ip-country-region',
  'x-vercel-ip-latitude',
  'x-vercel-ip-longitude',
  'x-vercel-ip-postal-code',
  'x-vercel-ip-timezone',
  'x-vercel-protection-bypass',
]);

function serializeHeaders(headers: Headers) {
  return Object.fromEntries(
    headers.entries().map(([name, value]) => [
      name,
      sensitiveHeaders.has(name) ? '[REDACTED]' : value,
    ]),
  );
}

export function proxy(request: NextRequest) {
  if (!shouldLogRequests) {
    return NextResponse.next();
  }

  const accept = request.headers.get('accept');
  const acceptsMarkdown = accept !== null && markdownAcceptPattern.test(accept);
  const isNegotiableContentPath = contentPaths.test(request.nextUrl.pathname);

  console.info(
    JSON.stringify({
      event: 'server-request',
      method: request.method,
      pathname: request.nextUrl.pathname,
      headers: serializeHeaders(request.headers),
      contentNegotiation: {
        acceptsMarkdown,
        isNegotiableContentPath,
        rewritesToMarkdown: acceptsMarkdown && isNegotiableContentPath,
      },
    }),
  );

  return NextResponse.next();
}

export const config = {
  matcher: '/:path*',
};
