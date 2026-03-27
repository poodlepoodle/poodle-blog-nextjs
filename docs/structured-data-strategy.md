# Structured Data Strategy

이 문서는 푸들 블로그의 JSON-LD 구조화 데이터(Structured Data) 전략을 정의합니다.  
모든 구조화 데이터는 `src/constants/json-ld.ts`에서 관리되며, Schema.org 표준 및 Google Rich Results 가이드라인을 따릅니다.

---

## 📁 파일 위치

```
src/constants/json-ld.ts   ← 모든 구조화 데이터 함수 및 공통 상수
```

---

## 🧩 공통 상수

반복되는 엔티티를 파일 상단에 상수로 정의하여 모든 함수에서 재사용합니다.

| 상수 | Schema.org 타입 | 설명 |
|------|----------------|------|
| `LOGO` | `ImageObject` | 사이트 로고 (`/apple-icon.png`, 512×512) |
| `PUBLISHER` | `Organization` | 발행 주체 (푸들 블로그) |
| `AUTHOR` | `Person` | 작성자 (최어진) |

### AUTHOR 상수 주요 필드

- `@id`: `${BASE_URL}/about#person` — 작성자 엔티티의 고유 URI 식별자
- `sameAs`: GitHub 프로필 URL — 검색 엔진의 E-E-A-T(신뢰도) 강화용

> 소셜 프로필이 추가될 때 `AUTHOR.sameAs` 배열에 URL을 추가합니다.

---

## 📄 페이지별 함수 매핑

| 함수명 | 적용 페이지 | 최상위 `@type` | 구조 |
|--------|-------------|---------------|------|
| `blogStructuredData` | `/` (홈) | `@graph` | `WebSite` + `ItemList` |
| `blogListStructuredData` | `/posts` | `ItemList` | 단일 객체 |
| `blogPostStructuredData` | `/posts/[slug]` | `@graph` | `BreadcrumbList` + `BlogPosting` |
| `playgroundListStructuredData` | `/playgrounds` | `ItemList` | 단일 객체 |
| `playgroundPostStructuredData` | `/playgrounds/[slug]` | `@graph` | `BreadcrumbList` + `BlogPosting` |
| `logListStructuredData` | `/logs` | `ItemList` | 단일 객체 |
| `logPostStructuredData` | `/logs/[slug]` | `@graph` | `BreadcrumbList` + `BlogPosting` |

---

## 🏗️ 구조 설계 원칙

### 1. 상세 페이지: `@graph` + `BreadcrumbList`

상세 페이지는 `@graph` 배열로 여러 엔티티를 병렬 선언합니다.

```json
{
  "@context": "https://schema.org",
  "@graph": [
    { "@type": "BreadcrumbList", ... },
    { "@type": "BlogPosting", "@id": "...#article", ... }
  ]
}
```

- `BreadcrumbList`는 Google 검색 결과에서 URL 대신 `홈 > 포스트 > 제목` 경로를 노출시킵니다.
- `@graph`는 동일 페이지에 여러 엔티티가 공존할 때 각각을 명확히 분리합니다.

### 2. 홈 페이지: `WebSite` + `ItemList` 분리

원래 `@type: ['WebSite', 'ItemList']` 배열 타입 방식은 검색 엔진이 페이지 성격을 모호하게 해석할 수 있어, `@graph`로 두 엔티티를 명확히 분리합니다.

### 3. 목록 페이지: 단일 `ItemList`

목록 페이지는 BreadcrumbList가 불필요하므로 단일 `ItemList` 객체로 유지합니다.  
`numberOfItems: posts.length`를 반드시 포함합니다.

---

## 🔑 `@id` 사용 규칙

`@id`는 실제 탐색 가능한 URL이 아닌 **링크드 데이터 그래프 내의 엔티티 고유 URI 식별자**입니다.

| 엔티티 | `@id` 패턴 | 비고 |
|--------|-----------|------|
| `BlogPosting` | `${BASE_URL}/{section}/{slug}#article` | 글 콘텐츠 엔티티 |
| `WebPage` (mainEntityOfPage) | `${BASE_URL}/{section}/{slug}` | 실제 페이지 URL |
| `Person` (AUTHOR) | `${BASE_URL}/about#person` | 작성자 엔티티 |

`#article`, `#person` 등의 fragment는 HTML 앵커가 아니라 동일 URL에 연결된 서로 다른 엔티티(`WebPage` vs `BlogPosting`)를 구분하는 식별자입니다. 실제 페이지에 해당 `id` 속성이 없어도 됩니다.

---

## 🖼️ ImageObject 규격

| 대상 | width | height | 비고 |
|------|-------|--------|------|
| 포스트 썸네일 (`thumbnail-large.webp`) | 1200 | 630 | Google 권장 최소 1200px |
| 사이트 로고 (`apple-icon.png`) | 512 | 512 | |

모든 `ImageObject`에 `name` 필드를 반드시 포함합니다.

---

## ⚠️ 주의 사항

### playground 이미지 경로

페이지 URL과 이미지 파일 경로의 단복수가 다릅니다. 이는 의도된 설계입니다.

```
페이지 URL:    /playgrounds/{slug}          ← 복수
이미지 파일:   /public/playground/{slug}/   ← 단수 (실제 디렉터리 구조)
```

`playgroundListStructuredData`, `playgroundPostStructuredData`의 `ImageObject.url`은 `/playground/` (단수)를 사용합니다.

### PlaygroundPost 타입 제약

`PlaygroundPost` 타입에는 `description`과 `tags` 필드가 없습니다 (`src/types/post.types.ts` 참고).  
따라서 playground 관련 함수에서는 `description`을 하드코딩된 기본 문구로 대체하며, `keywords`는 `BRAND_KEYWORDS` 상수를 사용합니다.

### dateModified

현재 `dateModified`는 `publishedAt`과 동일한 값을 사용합니다.  
추후 포스트에 `updatedAt` 필드가 추가되면 해당 값으로 교체해야 합니다.

---

## 🔮 확장 시 고려 사항

| 상황 | 조치 |
|------|------|
| 소셜 프로필 추가 (LinkedIn 등) | `AUTHOR.sameAs` 배열에 URL 추가 |
| 포스트에 `updatedAt` 필드 추가 | 모든 함수의 `dateModified` 값을 `updatedAt`으로 교체 |
| 새로운 섹션 페이지 추가 | 목록/상세 각각 `blogListStructuredData`, `blogPostStructuredData` 패턴을 참고하여 새 함수 작성 |
| `PlaygroundPost`에 `description` 추가 | `playgroundListStructuredData`와 `playgroundPostStructuredData`의 하드코딩 문구를 `post.description`으로 교체 |
