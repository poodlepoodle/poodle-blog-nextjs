# 에이전트 콘텐츠 협상 (Agent Content Negotiation)

포스트 상세 URL 하나가 사람에게는 HTML을, LLM·에이전트·크롤러에게는 raw markdown을 응답하는 구조를 정리한다.

- **출처**: [Vercel — Making agent-friendly pages with content negotiation](https://vercel.com/blog/making-agent-friendly-pages-with-content-negotiation)
- **최초 구현**: `86ab02b` (2026-04-05)
- **문서 작성**: 2026-08-21 — 구현 당시 세션 기록(`docs/Agent optimized content negotiation.md`, 원본 대화 전문)과 git 히스토리를 대조해 재구성

이 문서는 **"왜 이렇게 되어 있는가"**를 담는다. 결과 구조만 보려면 `docs/post-build-flow.md` 4.2절을 참고한다.

---

## 1. 요청 흐름

`next.config.ts`의 `rewrites().beforeFiles`에 섹션(`/posts`, `/logs`, `/playgrounds`)마다 두 개씩, 총 6개의 rewrite가 걸려 있다.

```
GET /posts/foo
  Accept: text/html      → [rewrite 미적용] → posts/[slug]/page.tsx     → 정적 HTML (+JSON-LD)
  Accept: text/markdown  → [rewrite 적용]   → posts/md/[slug]/route.ts  → text/markdown
GET /posts/foo.md        → [Accept와 무관하게 .md rewrite 적용] → posts/md/[slug]/route.ts → text/markdown
```

| 진입 경로 | 헬퍼 | 정의 위치 |
| --- | --- | --- |
| `Accept: text/markdown` 헤더 | `markdownRewrite(prefix)` | `next.config.ts:14-27` |
| `.md` 확장자 URL | `dotMdRewrite(prefix)` | `next.config.ts:26-33` |

`beforeFiles` 단계이므로 파일시스템 라우팅보다 먼저 평가된다. custom route 처리 순서는 `headers` → `redirects` → `rewrites.beforeFiles` → 파일시스템 라우팅 → `rewrites.afterFiles` → 동적 라우팅 → `rewrites.fallback`이다. 따라서 `headers()`의 보안 헤더는 rewrite된 라우트 핸들러 응답에도 적용된다.

### 공개 URL과 내부 URL 구분

**`/posts/md/[slug]`는 rewrite의 destination일 뿐, 공개 URL이 아니다.** 외부에 노출하는 주소는 두 가지뿐이다.

- `/posts/[slug]` — `Accept: text/markdown`을 보내면 마크다운
- `/posts/[slug].md` — 헤더 없이 직접 접근

따라서 `alternates.types`, `llms.txt`, 사이트맵 등 **밖으로 나가는 링크는 전부 `.md` 형태**를 쓴다. 최초 구현에서 `alternates.types`가 `/posts/md/${slug}`를 가리켰던 것을 `/posts/${slug}.md`로 교체한 이유다. 새 노출 지점을 추가할 때도 이 원칙을 지킨다.

---

## 2. 응답 구조

세 라우트 핸들러가 동일한 형태를 유지한다.

- `src/app/posts/md/[slug]/route.ts`
- `src/app/logs/md/[slug]/route.ts`
- `src/app/playgrounds/md/[slug]/route.ts`

각 핸들러는 `getBlogPost(slug)` 등으로 단건을 조회한 뒤, **frontmatter를 재조립**해서 본문 앞에 붙인다. 원본 MDX를 그대로 자르는 것이 아니라 필요한 필드만 다시 쓰는 방식이라, 섹션별 스키마 차이가 출력에 그대로 드러난다.

| 섹션 | frontmatter 필드 |
| --- | --- |
| `posts` | title, publishedAt, updatedAt?, description, tags |
| `logs` | title, publishedAt, updatedAt?, description (tags 없음) |
| `playgrounds` | title, publishedAt, updatedAt? (description·tags 없음) |

`src/types/post.types.ts`의 `Omit` 구조가 그대로 반영된 형태다. 타입 스키마를 바꾸면 세 핸들러를 함께 손봐야 한다.

본문(`post.content`)은 **변환 없는 raw MDX**다. HTML 렌더링 경로(`MDXContent` → `MDXRemote` + `remarkGfm` + `rehypeSlug` + 커스텀 컴포넌트)를 전혀 타지 않는다. 따라서 playground 포스트의 JSX 컴포넌트(`<ImageMarquee />` 등)는 마크다운 응답에 태그 그대로 나간다. 의도된 동작이다 — 에이전트에게는 원문이 더 정확하고, 변환기를 하나 더 두는 비용이 이득보다 크다.

응답 헤더:

```
Content-Type: text/markdown; charset=utf-8
Cache-Control: public, max-age=3600, stale-while-revalidate=86400
```

---

## 3. 발견(discovery) 경로

콘텐츠 협상만 있으면 "물어볼 줄 아는" 에이전트만 쓴다. 세 겹으로 알린다.

1. **`<link rel="alternate">`** — 상세 페이지 `generateMetadata`의 `alternates.types`
   `src/app/posts/[slug]/page.tsx:32-36` → `'text/markdown': '/posts/${slug}.md'`. 세 섹션 동일.
2. **`llms.txt`** — `src/app/llms.txt/route.ts`. 목록 링크가 HTML URL이 아니라 **`.md` URL**로 나간다. 인덱스만 읽어도 바로 마크다운으로 들어온다.
3. **`robots.ts`** — 악성 봇 블랙리스트만 두고 나머지는 와일드카드 전면 허용. GPTBot, ClaudeBot, PerplexityBot, OAI-SearchBot 등이 통과한다.

---

## 4. 원본 레퍼런스 대비 차이

| 항목 | 출처 |
| --- | --- |
| `markdownRewrite` (Accept 헤더 분기) | Vercel 원문 그대로 |
| 라우트 핸들러 골격 (`GET` → `await params` → `notFound()` → `Response`) | Vercel 원문 |
| `dotMdRewrite` (`.md` 접미사 rewrite) | 직접 도출 |
| `pageExtensions`에서 `md`/`mdx` 제거 | **이 블로그 고유** |
| 라우트 핸들러의 `generateStaticParams` | **이 블로그 고유** |
| `dynamicParams = false` | **이 블로그 고유** |
| `llms.txt`의 `dynamic = 'force-static'` | Vercel의 사이트맵 패턴을 이식 |
| `Cache-Control` + `charset=utf-8` | 직접 추가 |
| 섹션별 frontmatter 조립 | **이 블로그 고유** (3-타입 스키마) |
| 마크다운 사이트맵 라우트 | 의도적 생략 — `llms.txt`가 같은 역할 |
| `link rel=alternate` 대상 | Vercel은 사이트 전역 `/llms.txt`, 여기는 **포스트별 `.md`** |

`markdownRewrite` 함수는 Vercel 글의 코드와 거의 글자 그대로 동일하다. prefix가 `/blog`, `/changelog`에서 `/posts`, `/logs`, `/playgrounds`로 바뀐 것뿐이다.

Vercel 코드 샘플의 응답 헤더는 `'Content-Type': 'text/markdown'` 하나뿐이다. `charset=utf-8`(한글 콘텐츠)과 `Cache-Control`은 직접 정한 값이다.

---

## 5. 정적 렌더링 제약 — 이 블로그에서 추가된 세 줄

**가장 중요한 절**이다. 위 표에서 "이 블로그 고유"로 표시된 것 중 세 가지는 전부 같은 뿌리에서 나왔다.

> **`get-posts.ts`의 로더는 `fs.readdir('./posts/blog')` 같은 상대 경로 파일 I/O를 한다. 이 경로는 빌드 타임에만 존재하고, Vercel 서버리스 함수 번들에는 `posts/` 디렉터리가 포함되지 않는다.**

Vercel의 정적 코드 분석은 런타임에 계산되는 경로 상수를 추적하지 못한다. 따라서 마크다운 라우트가 빌드 출력에서 `ƒ (Dynamic)`으로 잡히는 순간 요청 시점에 ENOENT가 나고 500이 된다.

### 타임라인 — 2026-04-05 하루에 세 번 고침

| 커밋 | 시각 | 증상 | 수정 |
| --- | --- | --- | --- |
| `86ab02b` | 21:21 | — | 최초 구현 (rewrite + 핸들러 3개 + `alternates.types`) |
| `68fa532` | 21:38 | 프로덕션에서 `.md` URL 500 | `pageExtensions`에서 `'md'`, `'mdx'` 제거 |
| `5011e69` | 21:52 | 배포 후에도 500 | 라우트 핸들러에 `generateStaticParams` 추가 |
| `c793ad0` | 22:40 | 여전히 500 | `dynamicParams = false` 추가 |
| `7e5a1d6` | 04-11 | (선제 조치) | `llms.txt`에 `dynamic = 'force-static'` |

### ① `pageExtensions`에서 `md`, `mdx` 제거 — `68fa532`

```diff
- pageExtensions: ['js', 'jsx', 'ts', 'tsx', 'md', 'mdx'],
+ pageExtensions: ['js', 'jsx', 'ts', 'tsx'],
```

이 블로그는 `posts/**/*.mdx`를 **콘텐츠**로 두고 MDX를 직접 렌더링하므로 원래 `pageExtensions`에 `md`, `mdx`가 들어 있었다. 그 상태에서 `/posts/foo.md` 요청이 프로덕션에서 500이 났다.

**dev 서버(Turbopack)에서는 정상 동작했고 프로덕션 빌드에서만 깨졌다.** dev는 요청마다 rewrite를 동적으로 평가하지만, 프로덕션은 빌드 타임 정적 라우트 분석 단계에서 `pageExtensions`에 등록된 확장자를 먼저 처리하기 때문이다. **dev에서 된 것이 맞는 동작이 아니라 우연히 된 것이었다.** Next.js에서 dev와 production 동작이 갈릴 때는 production을 기준으로 판단한다.

`src/app/` 아래에는 `.md`/`.mdx` 페이지 파일이 하나도 없으므로 제거해도 잃는 것이 없다.

### ② 라우트 핸들러에 `generateStaticParams` — `5011e69`

Vercel 원문의 라우트 핸들러에는 이것이 **없다**. 원문은 마크다운 사이트맵에만 `dynamic = 'force-static'`을 건다.

여기서 필요했던 이유가 위에 적은 상대 경로 파일 I/O다. `generateStaticParams`를 붙여 빌드 출력을 `ƒ` → `●`로 바꾼 것이 수정이다. 커밋 메시지 `generate post's markdown-content at build time as same as post page`가 정확히 이 얘기다 — 페이지와 동일한 정적 생성 경로로 끌어온 것.

### ③ `dynamicParams = false` — `c793ad0`

②만으로는 부족했다. `dynamicParams` 기본값이 `true`라 사전 생성 목록에 없는 slug 요청이 오면 여전히 런타임에 핸들러를 실행하고 같은 ENOENT로 500이 났다. `false`면 핸들러를 실행하지 않고 즉시 404다.

**여기가 이 구조에서 가장 비대칭적인 지점이다.**

| | `posts/[slug]/page.tsx` | `posts/md/[slug]/route.ts` |
| --- | --- | --- |
| `generateStaticParams` | 있음 | 있음 |
| `dynamicParams` | **설정 없음** (기본 `true`) | **`false` 필수** |
| 빌드 결과 | `● (SSG)` | `● (SSG)` |

페이지는 `dynamicParams` 없이도 잘 빌드되고 잘 돌아간다. 같은 `getBlogPosts()` → `unstable_cache` → `fs.readdir` 경로를 쓰는데도 그렇다. **라우트 핸들러만 이것이 필요했다.** 페이지 쪽 관례를 그대로 복사하면 안 되는 케이스다.

> 당시 `unstable_cache`가 라우트 핸들러를 동적으로 강제하는 것 아닌가 의심했으나, 페이지가 같은 것을 쓰면서 정적으로 빌드되므로 원인이 아니었다. 실제 원인은 `dynamicParams` 기본값이다.

### ④ `llms.txt`의 `dynamic = 'force-static'` — `7e5a1d6`

`llms.txt`도 같은 로더 세 개를 호출하므로 동일한 ENOENT 리스크가 있었다. Vercel 글의 마크다운 사이트맵 패턴을 그대로 적용해 선제 차단했다.

### 절대 규칙

**`posts/` 디렉터리를 읽는 라우트는 절대 `ƒ (Dynamic)`으로 빌드되면 안 된다.**

- 동적 세그먼트가 있는 라우트 핸들러 → `generateStaticParams` + `dynamicParams = false`
- 동적 세그먼트가 없는 라우트 핸들러 → `dynamic = 'force-static'`
- 추가 후 `yarn build` 출력에서 해당 라우트가 `●`인지 확인한다. `ƒ`면 프로덕션에서 500이 난다.

---

## 6. 알려진 제약 / 미적용 제안

2026-08-21 재점검에서 확인한 제약과 미적용 제안이다.

### ① `Vary: Accept` 헤더 부재 — 수용한 캐시 트레이드오프

같은 공개 URL이 요청 헤더에 따라 다른 바디를 내므로, 중간 캐시(CDN·프록시·브라우저)가 한쪽 표현을 다른 쪽에 재사용하지 않도록 `Vary: Accept`가 필요하다.

`next.config.ts`의 `headers()`나 `src/proxy.ts`에서 추가하는 방식은 이 프로젝트의 정적 HTML 응답에는 충분하지 않다. Next.js가 정적 App Router 페이지를 보낼 때 자체 `Vary` 값을 나중에 설정해 `Accept`를 덮어쓴다. 반면 markdown route handler 응답에는 병합된다.

현재는 Accept 기반 콘텐츠 협상과 SSG를 유지하는 쪽을 택하고 이 제약을 수용한다. `.md` URL과 `llms.txt`가 markdown의 주 발견 경로라 해당 URL들은 표현이 하나뿐이며, 일반적인 요청에서 캐시 충돌 가능성은 낮다.

추후 배포 CDN·리버스 프록시를 추가하거나 캐시 이상 징후가 생기면, 최종 응답의 기존 `Vary` 값에 `Accept`를 병합한다. 실제 배포 플랫폼의 캐시 키가 rewrite의 `has: Accept` 조건을 구분하는지도 함께 확인한다.

```ts
// 배포 계층에서 기존 Vary 값에 Accept를 병합한다.
Vary: Accept, rsc, next-router-state-tree, next-router-prefetch, next-router-segment-prefetch
```

### ② 단순 `Accept` 매칭 — 수용한 구현 단순화

`markdownRewrite`는 HTTP `Accept` 헤더 전체를 협상하지 않고 `text/markdown` 부분 문자열만 검사한다. 따라서 대부분의 봇 기본값인 `*/*`나 `Accept` 미전송 요청은 HTML을 받는다. 즉 **실질적 주 통로는 `.md` URL과 `llms.txt`**다.

이 구현은 Vercel 원문의 방식을 그대로 따른다. 일반적인 에이전트 요청인 `Accept: text/markdown, text/html, */*`에는 의도대로 markdown을 반환한다.

품질값(`q`)은 해석하지 않는다. 따라서 `text/markdown;q=0`("markdown을 받지 않겠다")이나 `text/html;q=1, text/markdown;q=0.1`처럼 markdown의 선호도가 낮은 요청도 markdown을 받는다. 이는 HTTP 의미론을 완전히 구현한 것은 아니지만, 주요 에이전트가 `text/markdown;q=0`을 기본값으로 보낸다는 근거는 없고 실제 발생 가능성이 낮다고 판단했다.

정확한 품질값 협상을 하려면 `next.config.ts`의 정규식 대신 Proxy/Middleware에서 `Accept`를 파싱해 내부 markdown 경로로 rewrite해야 한다. 이 경우 요청 경로와 운영 복잡도가 늘어나므로, 현재는 단순 정규식을 유지한다. 실제 요청 로그에서 이 패턴이 확인되거나 범용 HTTP 클라이언트 호환성이 요구될 때 재검토한다.

### ③ `.md` URL의 Accept rewrite 재적용 — 해결됨 (2026-08-21)

초기 `markdownRewrite(prefix)`는 `:path*`를 대상으로 했다. 그래서 `/posts/foo.md`에 `Accept: text/markdown`을 함께 보내면 Accept rewrite가 먼저 `/posts/md/foo.md`로 바꿔 존재하지 않는 slug를 요청했고, 내부 destination인 `/posts/md/foo`도 같은 이유로 한 번 더 rewrite될 수 있었다.

현재는 Accept rewrite의 source를 점(`.`)과 슬래시(`/`)를 허용하지 않는 단일 slug로 제한한다. 따라서 `.md` URL은 `dotMdRewrite`만 적용되고, 내부 `/md/:slug`는 그대로 라우트 핸들러로 전달된다.

### ④ frontmatter 따옴표 이스케이프 — 해결됨 (2026-08-21)

초기 구현은 세 핸들러에서 `title` 등을 `'${post.title}'`로 감쌌다. 값 안에 작은따옴표가 있으면 YAML이 잘못 파싱된다.

현재 재현되는 사례가 있다. `posts/log/escaping-from-z-index-9999.mdx`의 제목이 `'z-index: 9999'에서 벗어나세요`라, `/logs/escaping-from-z-index-9999.md` 응답이 이렇게 나간다.

```yaml
title: ''z-index: 9999'에서 벗어나세요'
```

이후 세 핸들러에서 문자열 필드를 `JSON.stringify`로 직렬화했다. JSON 문자열은 YAML double-quoted scalar와 호환되므로 작은따옴표·큰따옴표·역슬래시가 안전하게 보존된다.

```diff
- `title: '${post.title}'`,
+ `title: ${JSON.stringify(post.title)}`,
```

`description`, `publishedAt`, `updatedAt`도 같은 방식으로 처리한다. `tags`는 배열 전체를 직렬화해 valid flow sequence로 만든다.

```diff
- `tags: [${post.tags.map(t => `'${t}'`).join(', ')}]`,
+ `tags: ${JSON.stringify(post.tags)}`,
```

---

## 7. 새 섹션을 추가할 때 체크리스트

`blog`/`playground`/`log` 외에 네 번째 섹션을 만들 경우:

1. `src/app/{section}/md/[slug]/route.ts` 생성 — 기존 세 개와 **출력 형태를 맞춘다** (frontmatter 조립 방식, 두 응답 헤더)
2. 핸들러에 `generateStaticParams` + `dynamicParams = false` (5절 절대 규칙)
3. `next.config.ts`의 `beforeFiles`에 `markdownRewrite('/{section}')`, `dotMdRewrite('/{section}')` 두 줄 추가
4. `{section}/[slug]/page.tsx`의 `generateMetadata`에 `alternates.types['text/markdown'] = '/{section}/${slug}.md'` — **`.md` 형태로** (1절 공개 URL 원칙)
5. `src/app/llms.txt/route.ts`에 섹션 추가 — 링크는 `.md` URL
6. `yarn build` 출력에서 새 라우트가 `●`인지 확인

---

## 참고

- `docs/post-build-flow.md` — 빌드 전체 플로우. 4.2절이 이 문서의 요약본
- `docs/Agent optimized content negotiation.md` — 구현 당시 원본 세션 기록 전문
- `src/types/post.types.ts` — 섹션별 frontmatter 스키마
