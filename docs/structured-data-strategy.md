# Structured Data Strategy

이 문서는 푸들 블로그의 JSON-LD 구조화 데이터 전략을 정의한다.  
Schema.org 표준 및 Google Rich Results 가이드라인을 따르며, `schema-dts` 패키지로 타입 안전성을 보장한다.

---

## 파일 위치

```
src/constants/json-ld.ts         ← 구조화 데이터 생성 함수 및 공통 상수
src/components/json-ld/index.tsx ← <script type="application/ld+json"> 주입 컴포넌트
```

컴포넌트의 prop 타입은 `WithContext<Thing> | Graph`다. 모든 함수의 반환 타입은 `Graph`로 통일되어 있다.

---

## 공통 상수

| 상수 | schema-dts 타입 | 설명 |
|------|----------------|------|
| `LOGO` | `ImageObject` | 사이트 로고 (`/apple-icon.png`, `512×512`) |
| `PUBLISHER` | `Organization` | 발행 주체 (푸들 블로그) |
| `AUTHOR` | `Person` | 작성자 (최어진), `@id: /about#person`, `sameAs: [GitHub]` |

**`AUTHOR.@id`의 역할**: `BlogPosting.author`와 `ProfilePage.mainEntity` 양쪽에서 동일 URI(`/about#person`)를 참조함으로써 검색 엔진이 "동일 인물"로 인식한다. 소셜 프로필이 추가될 때 `AUTHOR.sameAs` 배열에 URL을 추가한다.

---

## 페이지별 함수 매핑

| 함수명 | 적용 페이지 | @graph 노드 구성 |
|--------|------------|-----------------|
| `blogStructuredData` | `/` | `WebSite` + `ItemList` |
| `aboutStructuredData` | `/about` | `BreadcrumbList` + `ProfilePage` (mainEntity: Person) |
| `blogListStructuredData` | `/posts` | `BreadcrumbList` + `CollectionPage` + `ItemList` |
| `blogPostStructuredData` | `/posts/[slug]` | `BreadcrumbList` + `BlogPosting` |
| `playgroundListStructuredData` | `/playgrounds` | `BreadcrumbList` + `CollectionPage` + `ItemList` |
| `playgroundPostStructuredData` | `/playgrounds/[slug]` | `BreadcrumbList` + `BlogPosting` |
| `logListStructuredData` | `/logs` | `BreadcrumbList` + `CollectionPage` + `ItemList` |
| `logPostStructuredData` | `/logs/[slug]` | `BreadcrumbList` + `BlogPosting` |

홈(`/`)을 제외한 전 페이지에 `BreadcrumbList`가 포함된다.

---

## 구조 설계 원칙

### 홈 페이지: `WebSite` + `ItemList`

```
@graph
├── WebSite   @id: /#website, name, description, url, author, publisher, inLanguage
└── ItemList  name, url, numberOfItems, itemListElement[BlogPosting]
```

`WebSite`는 `CreativeWork`를 상속하므로 `author`, `publisher`, `inLanguage`가 유효하다. `ItemList`(`Intangible` 상속)에는 이 필드들이 없으므로 `WebSite` 노드에 위임한다.

### 목록 페이지: `BreadcrumbList` + `CollectionPage` + `ItemList`

```
@graph
├── BreadcrumbList  itemListElement[홈, 섹션명]
├── CollectionPage  name, description, url, author, publisher, inLanguage, about
└── ItemList        numberOfItems, itemListElement[BlogPosting]
```

`CollectionPage`(`WebPage > CreativeWork` 상속)에 페이지 메타데이터를 위임하고, `ItemList`에 목록 구조를 분리한다. `/posts`는 `tags` 파라미터를 `CollectionPage.about`에 `Thing` 배열로 삽입하며, `/playgrounds`·`/logs`는 `BRAND_KEYWORDS`를 사용한다.

### 상세 페이지: `BreadcrumbList` + `BlogPosting`

```
@graph
├── BreadcrumbList  itemListElement[홈, 섹션, 글 제목]
└── BlogPosting     @id: /…#article, mainEntityOfPage: WebPage(@id: /…)
```

`BlogPosting`에 `articleBody`(전문), `articleSection`, `inLanguage`, `about`(태그), `keywords`를 포함해 콘텐츠 맥락을 전달한다. `mainEntityOfPage`에 `WebPage` 노드를 내포하고 `@id`를 선언해 페이지와 글 엔티티를 구분한다.

### 소개 페이지: `BreadcrumbList` + `ProfilePage`

```
@graph
├── BreadcrumbList  itemListElement[홈, 소개]
└── ProfilePage     @id: /about#profilepage, mainEntity: Person(@id: /about#person)
```

`ProfilePage`는 Google 공식 지원 타입이다. `mainEntity.@id`가 `AUTHOR.@id`와 일치해 `BlogPosting.author`와 그래프 연결이 이루어진다.

---

## @id 사용 규칙

`@id`는 탐색 가능한 URL이 아닌 **링크드 데이터 그래프 내의 엔티티 고유 URI 식별자**다.

| 엔티티 | `@id` 패턴 | 비고 |
|--------|-----------|------|
| `WebSite` | `${BASE_URL}/#website` | 사이트 엔티티 |
| `BlogPosting` | `${BASE_URL}/{section}/{slug}#article` | 글 콘텐츠 엔티티 |
| `WebPage` (mainEntityOfPage) | `${BASE_URL}/{section}/{slug}` | 실제 페이지 URL |
| `Person` (AUTHOR) | `${BASE_URL}/about#person` | 작성자 엔티티 |
| `ProfilePage` | `${BASE_URL}/about#profilepage` | 소개 페이지 엔티티 |

`#article`, `#person` 등의 fragment는 HTML 앵커가 아니라 동일 URL에 연결된 서로 다른 엔티티를 구분하는 식별자다. 실제 페이지에 해당 `id` 속성이 없어도 된다.

---

## ImageObject 규격

`width`/`height`는 schema-dts가 `string | QuantitativeValue`를 요구하므로 숫자가 아닌 문자열로 선언한다. 모든 `ImageObject`에 `name` 필드를 포함한다.

반복되는 이미지 패턴은 `ImageObject` 반환 타입의 팩토리 함수로 관리한다. `@graph` 내부의 깊은 중첩에서도 타입 검사가 보장된다.

| 팩토리 / 상수 | 대상 | 이미지 경로 | 크기 |
|--------------|------|------------|------|
| `postThumbnail(slug, title)` | 포스트 썸네일 | `/posts/{slug}/thumbnail-large.webp` | 1896×912 |
| `playgroundThumbnail(slug, title)` | 플레이그라운드 썸네일 | `/playground/{slug}/thumbnail-large.webp` | 1896×912 |
| `logThumbnail(title)` | 로그 공용 이미지 | `/og/og-large.jpg` | 1896×912 |
| `LOGO` | 사이트 로고 | `/apple-icon.png` | 512×512 |

---

## 주의 사항

### playground 이미지 경로

페이지 URL과 이미지 파일 경로의 단복수가 다르다. 이는 의도된 설계다.

```
페이지 URL:  /playgrounds/{slug}         ← 복수
이미지 경로: /public/playground/{slug}/  ← 단수 (실제 디렉터리 구조)
```

`playgroundThumbnail` 팩토리 내부에서 `/playground/` (단수)를 사용한다.

### PlaygroundPost 타입 제약

`PlaygroundPost`에는 `description`과 `tags` 필드가 없다 (`src/types/post.types.ts` 참고). playground 관련 함수에서 `description`은 하드코딩된 기본 문구로 대체하며, `about`는 `BRAND_KEYWORDS` 상수를 사용한다.

### dateModified

현재 `dateModified`는 `publishedAt`과 동일한 값을 사용한다. 포스트에 `updatedAt` 필드가 추가되면 해당 값으로 교체해야 한다.

---

## Rich Results 지원 가능성

| 스키마 타입 | 적용 페이지 | Google Rich Results 지원 | 비고 |
|-------------|------------|--------------------------|------|
| `BreadcrumbList` | 홈(`/`) 제외 전 페이지 (7개) | ✅ 공식 지원 | 검색 결과 URL에 경로 노출 |
| `BlogPosting` | 상세 페이지 3종 | ✅ Article로 인식 | 이미지, 날짜, 작성자 노출 가능 |
| `ProfilePage` | `/about` | ✅ 공식 지원 (2023~) | 작성자 정보 패널 연계 |
| `CollectionPage` | 목록 페이지 3종 | ⚠️ 간접 지원 | 독립 Rich Result 없으나 크롤링 컨텍스트 개선 |
| `WebSite` | `/` | ✅ Sitelinks 검색창 연계 가능 | `potentialAction: SearchAction` 추가 시 활성화 |

---

## 확장 시 고려 사항

| 상황 | 조치 |
|------|------|
| 소셜 프로필 추가 | `AUTHOR.sameAs` 배열에 URL 추가 |
| 포스트에 `updatedAt` 추가 | 모든 함수의 `dateModified`를 `updatedAt`으로 교체 |
| 새 섹션 추가 | `blogListStructuredData`, `blogPostStructuredData` 패턴을 참고하여 새 함수 작성 |
| `PlaygroundPost`에 `description` 추가 | `playgroundListStructuredData`, `playgroundPostStructuredData`의 하드코딩 문구를 `post.description`으로 교체 |
| Sitelinks 검색창 활성화 | `blogStructuredData`의 `WebSite`에 `potentialAction: SearchAction` 추가 |
