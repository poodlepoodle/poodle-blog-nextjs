# 포스트 빌드 플로우

`posts/**/*.mdx` 파일이 사용자 화면에 노출되기까지의 전체 경로를 단계별로 정리한다. 빌드 타임에 모든 라우트가 정적으로 생성되며(SSG), 런타임에는 미들웨어 수준의 rewrite/redirect/header 처리만 일어난다.

---

## 1. 콘텐츠 작성

- 작성자는 `posts/blog/`, `posts/playground/`, `posts/log/` 중 하나에 `*.mdx`를 추가한다.
- 파일은 `frontmatter`(YAML) + 본문(MDX)으로 구성된다. 타입별 frontmatter 스키마는 `src/types/post.types.ts` 참고.
  - `BlogPost` — 전체 필드(title, description, publishedAt, updatedAt?, slug, tags, published?)
  - `PlaygroundPost` — `description`, `tags` 제외
  - `LogPost` — `tags` 제외
- `published: false`인 글은 어떤 단계에서도 산출물에 포함되지 않는다.
- `next.config.ts`의 `pageExtensions: ['js','jsx','ts','tsx']` 설정에 의해 `.mdx`는 **라우트로 인식되지 않고 콘텐츠로만 취급**된다. 즉 `src/app` 아래에는 두지 않는다.

---

## 2. 빌드 타임 (`yarn build`)

### 2.1 `generateStaticParams`로 slug 수집

세 섹션의 모든 라우트가 동일한 패턴으로 동작한다.

- `src/app/posts/[slug]/page.tsx` — HTML 페이지
- `src/app/posts/md/[slug]/route.ts` — raw markdown 응답
- `src/app/posts/page.tsx` — 리스트 페이지

각 라우트의 `generateStaticParams`가 `getBlogPosts()` 등을 호출해 slug 목록을 얻고, `dynamicParams = false`로 묶여 빌드 타임에 생성된 slug만 응답하도록 잠근다.

### 2.2 `loadMdxPosts` (`src/utils/get-posts.ts`)

세 종류의 로더(`getBlogPosts`, `getPlaygroundPosts`, `getLogPosts`)는 모두 단일 제네릭 헬퍼 `loadMdxPosts<T>`에 위임된다. 동작 순서는 다음과 같다.

1. `fs.readdir(POST_PATHS.{blog|playground|log})`로 디렉토리 탐색
2. `.mdx`만 필터링
3. `fs.readFile`로 파일을 읽고 `gray-matter`로 `frontmatter` + `content` 분리
4. `data.published === false`인 항목 제외
5. 호출자가 넘긴 `transform` 콜백으로 타입별 객체 매핑 (`isRecentlyUpdated` 플래그 부여, `tags` 정렬 등)
6. `publishedAt` 내림차순 정렬

세 로더 모두 `unstable_cache(..., { revalidate: false })`로 감싸져 있다. SSG 환경에서는 **사실상 빌드 타임 일회성 캐시**로 동작한다.

### 2.3 단건 조회 — `get-post.ts`

`getBlogPost(slug)` 등은 위 로더 결과에서 `slug`로 단건을 찾는 얇은 래퍼다. 별도 파일 I/O가 없다는 점이 중요하다(전체 목록을 한 번 만든 뒤 메모리에서 lookup).

### 2.4 정적 산출물 생성

slug 목록을 기반으로 다음 산출물이 동시에 만들어진다.

| 산출물 | 진입점 | 내용 |
| --- | --- | --- |
| HTML 상세 페이지 | `posts/[slug]/page.tsx` | `generateMetadata`로 OG/canonical/keywords 주입, `JsonLd`로 `blogPostStructuredData` 삽입, `Article` 안에 `MDXContent` 렌더링 |
| 리스트 페이지 | `posts/page.tsx` | `blogListStructuredData`(`ItemList`) + `PostList` |
| Raw Markdown | `posts/md/[slug]/route.ts` | frontmatter를 재구성해서 본문과 합친 뒤 `Content-Type: text/markdown`으로 응답. `Cache-Control: public, max-age=3600, stale-while-revalidate=86400` |
| `llms.txt` | `src/app/llms.txt/route.ts` | AI 크롤러용 인덱스 |

`playground`, `log` 섹션도 동일한 3-파일 패턴(`page.tsx`, `[slug]/page.tsx`, `md/[slug]/route.ts`)을 따른다.

### 2.5 MDX → HTML 렌더링

`src/components/mdx/MDXContent.tsx`가 핵심이다.

- `next-mdx-remote-client/rsc`의 `MDXRemote`로 RSC 환경에서 직접 렌더링한다 (별도 컴파일 단계 없음).
- `remarkPlugins: [remarkGfm]` — GFM(테이블, 체크리스트 등) 지원
- `rehypePlugins: [rehypeSlug]` — 헤딩에 id 부여 → TOC 앵커
- 커스텀 컴포넌트로 기본 HTML 태그를 대체: `MDXLink`, `MDXImage`, `MDXCode`, `MDXInlineCode`, `MDXBlockquote`, `MDXH2`, `MDXH3`
- `isPlayground`일 때는 `CommonComponentLayout`, `ImageMarquee`, `LogoMarquee` 등을 추가로 주입
- 본문 세로 리듬은 `POST_SPACING` 상수가 `<article>`의 **직계 자식(`>`)만** 대상으로 통제한다. 모든 자식의 세로 padding을 0으로 리셋하고 간격은 margin으로만 준다 — 인접 형제 margin collapse가 전제라 실제 간격은 합이 아니라 max다. 비대칭 간격을 주는 heading은 `:not()`으로 균일 규칙(`my-post-paragraph`)에서 **먼저 제외해야 한다**. 명시도가 `(0,1,1)`로 동률이라 제외 없이 덮어쓰면 CSS 출력 순서에 의존하게 된다. 값(`src/theme/spacing.css`): h2 위 12rem / h3 위 6rem / 그 외·모든 아래 여백 3.5rem. 중첩된 heading(예: playground 컴포넌트 내부)은 규칙 대상이 아니며 Typography 기본값을 따른다.
- `MDXCode`는 `<pre>`가 받은 `children`(즉 `<code>` 엘리먼트)을 가공하지 않고 그대로 `bright`의 `Code`에 넘긴다. `bright`가 엘리먼트에서 코드 문자열과 언어를 직접 추출하면서 끝의 개행까지 잘라주기 때문이다. 문자열로 미리 벗겨서 넘기면 트림이 없는 분기로 빠져 코드 블록마다 빈 줄이 하나씩 더 렌더링된다.

이 모든 변환이 빌드 타임에 일어나서 결과적으로 **정적 HTML 문자열**이 만들어진다.

---

## 3. 배포

빌드 산출물(`.next/`)이 호스팅에 배포된다. 결과적으로 다음이 정적 자원으로 존재한다.

- `/posts`, `/posts/<slug>`, `/playgrounds/...`, `/logs/...` HTML
- `/posts/md/<slug>` 등 raw markdown 응답
- `/llms.txt`, `/rss.xml`, 각종 OG/JSON-LD

---

## 4. 런타임 (사용자 요청 처리)

`next.config.ts`에서 정의한 세 가지 미들웨어 레이어를 순서대로 거친다.

### 4.1 `redirects` — 레거시/별칭 정리

- `/blog` → `/posts` (308 permanent)
- `/blog/:slug*` → `/posts/:slug*`
- `/rss` → `/rss.xml`

새 코드에서 `/blog` 라우트를 다시 만들면 안 된다.

### 4.2 `rewrites` (`beforeFiles`) — 마크다운 응답 분기

각 섹션마다 두 종류의 rewrite가 걸려 있다.

1. **확장자 기반** — `/posts/:slug.md` → `/posts/md/:slug`
2. **`Accept` 헤더 기반** — `Accept: text/markdown`을 보낸 요청을 `/posts/md/:slug`로 우회

덕분에 동일한 URL이 사람에게는 HTML, LLM/크롤러에게는 raw markdown을 응답한다. (라우트 핸들러를 수정할 때는 세 섹션의 출력이 동일한 형태를 유지하도록 주의.)

> 이 구조의 설계 배경, 원본 레퍼런스(Vercel) 대비 차이, 정적 렌더링 제약 때문에 추가된 `generateStaticParams` / `dynamicParams = false` / `force-static`의 이유는 `docs/agent-content-negotiation.md`에 정리되어 있다.

### 4.3 `headers` — 보안 헤더 부착

모든 응답에 다음이 붙는다.

- `X-Content-Type-Options: nosniff`
- `X-Frame-Options: SAMEORIGIN`
- `Referrer-Policy: strict-origin-when-cross-origin`
- `Strict-Transport-Security: max-age=63072000; includeSubDomains; preload`
- `Permissions-Policy: camera=(), microphone=(), geolocation=()`

### 4.4 응답 → 브라우저 hydration

정적 HTML이 전달된 뒤 클라이언트에서는 다음이 활성화된다.

- Zustand 스토어 (`src/stores/post-store.ts`, `ui-store.ts`)
- `TocContext` (`src/contexts/toc-context.tsx`)
- `motion` 패키지 기반 애니메이션 (※ `framer-motion`은 사용 금지)
- Tailwind v4 스타일 (`src/app/globals.css`)

이 시점부터 사용자가 화면에서 포스트를 읽을 수 있다.

---

## 5. 한눈에 보는 순서

1. `posts/**/*.mdx` 추가
2. `yarn build` 시작
3. 각 라우트의 `generateStaticParams` → `getBlogPosts` 등 호출
4. `loadMdxPosts`로 디스크에서 읽고 `gray-matter`로 파싱, `published: false` 필터 + 정렬 + `unstable_cache`
5. slug별로 HTML 페이지(JSON-LD/Metadata 포함), raw markdown 라우트, 리스트 페이지, `llms.txt` 동시 생성
6. `MDXContent`가 `remark-gfm` + `rehype-slug` + 커스텀 컴포넌트로 MDX → HTML 변환
7. `.next/` 산출물 배포
8. 요청 도착 → `redirects` → `rewrites`(Accept/확장자에 따라 HTML/markdown 분기) → 보안 헤더 → 정적 응답
9. 브라우저에서 hydration → 사용자 화면에 노출
