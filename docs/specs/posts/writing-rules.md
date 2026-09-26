# 포스트 작성 표기 스펙

## 볼드 강조

### W-1. 따옴표 요소 강조

따옴표를 사용한 요소를 볼드로 강조할 때는 따옴표 안쪽 텍스트에만 볼드 처리하는 것으로 결정. 따옴표까지 볼드에 속하는 것은 기호 자체가 강조되어 부적절 (`**'상태'**` ❌ → `'**상태**'` ✅)

예외: 문장 전체를 볼드로 강조하면서 그 안에 따옴표 처리가 포함되는 경우는 그대로 유지 (예: `**'A이면서 동시에 B'일 수는 없습니다.**`)

### W-2. 닫는 따옴표 뒤 조사

볼드를 따옴표 안쪽에 두면 닫는 따옴표 뒤 조사는 공백 없이 바로 붙임 (`'**상태**'로`). 볼드가 따옴표 바깥에 있던 시절의 파싱 우회용 공백(`**'상태'** 로`)은 사용하지 않음

### W-3. 인라인 코드와 볼드 조합

인라인 코드(backtick)와 볼드 조합은 볼드가 바깥에 오는 `` **`code`** `` 형태만 가능(backtick 내부의 `**`는 리터럴로 렌더됨). 코드 토큰만 이중 강조하는 것은 지양하고, 문장 단위 강조 안에 코드가 포함되는 형태는 허용

### W-4. 항목명 강조 시 콜론 제외

`항목명: 내용...` 형태에서 항목명만 볼드로 강조할 때는 콜론을 볼드에 포함하지 않음 (`**항목명:** 내용` ❌ → `**항목명**: 내용` ✅). 기호는 강조 대상이 아니라는 따옴표 규칙과 동일한 원칙

예외: 문장 전체를 볼드로 강조하면서 그 안에 콜론이 포함되는 경우(인라인 코드 내부 콜론 등)는 그대로 유지 (예: `` **...`fetchStatus: paused`로 명확히 구분할 수 있습니다.** ``)

### W-5. 문장 전체 강조 시 온점 포함

문장 전체를 볼드로 강조할 때 문장 끝 온점은 볼드에 포함 (`**SEO는 확률 게임입니다**.` ❌ → `**SEO는 확률 게임입니다.**` ✅). 따옴표 · 콜론과 달리 온점은 강조에서 제외할 별도 기호가 아니라 문장을 이루는 구성 요소로 봄

## 따옴표

### Q-1. ASCII 따옴표 통일

곡선 따옴표(‘ ’, “ ”)는 사용하지 않고 모두 ASCII 따옴표(`'`, `"`)로 통일. 교정 시 홑따옴표(`'`)와 겹따옴표(`"`)의 구분은 원문 그대로 유지 (곡선 여닫이 짝 오타 · 혼합 짝 문제를 원천 차단)

## 대소문자

한글 문장 안에 포함되는 영어 단어(기술 용어 등)의 표기 규칙. C-1 → C-2 → C-3 → C-4 순으로 판단하고, C-5는 앞선 판단 결과와 무관하게 위치에 따라 덮어씀

### C-1. 약어는 전부 대문자

`CSS` · `API` · `HTML` · `DOM` · `JSX` · `SEO` · `GEO` · `UI` · `UX` · `IA` · `GUI` · `CMS` · `MVP` · `PR` · `FE` · `JSON-LD` 등 약어는 한글 문장 어디에 오든 전부 대문자

예외 1: 원 표현의 소문자 연결어는 소문자로 유지 (`HoC` _(Higher-order Component)_, `ToC` _(Table of Contents)_ — `HOC` ❌, `TOC` ❌)

예외 2: 파일 확장자는 소문자 그대로 표기하며 약어 규칙을 적용하지 않음 (예: `_(.jsx, .js, .css 기준)_`)

### C-2. 고유명사는 공식 표기 그대로

제품 · 라이브러리 · 회사 · 인명은 공식 표기를 그대로 사용 (`React` · `TanStack Query` · `Next.js` · `JavaScript` · `TypeScript` · `Tailwind CSS` · `styled-components` · `Figma` · `Storybook` · `Velog` · `GitHub` · `iOS`). 한글 문장 중간이라는 이유로 대문자를 추가하지 않음 (`Styled-components` ❌ → `styled-components` ✅, `Github` ❌ → `GitHub` ✅)

### C-3. 명칭으로 통용되는 개념어는 Title Case

공식 문서 · 웹 표준 · 서적에서 고유한 명칭으로 통용되는 용어는 한글 문장 중간에서도 각 단어를 대문자로 시작

- 라이브러리 문서 용어: `Query Status` · `Fetch Status` · `Data Cache` · `Stale-While-Revalidate`
- 웹 표준 · 스펙 용어: `Stacking Context` · `Formatting Context` · `Intersection Observer API` · `Layout Shift` · `Web Worker`
- 설계 원칙 · 패턴명: `Single Responsibility Principle` · `Separation of Concerns` · `Higher-order Component` · `Discriminated Union` · `Wrapper Hell`
- 디자인 프로세스 용어: `Pain Point` · `Solution Concept` · `Guiding Question` · `Design System` · `Wireframe`
- 레이아웃 명칭: `Masonry` · `Marquee` · `Carousel` · `Column` · `Row` · `Grid`

### C-4. 일반 명사 · 동사 용법은 소문자

같은 단어라도 고유한 명칭이 아니라 대상을 설명하는 일반 명사 · 동사로 쓰이면 소문자 (`atom` · `molecule` · `organism` · `template` · `page` · `props` · `context` · `provider` · `consumer` · `semantic tag` · `repaint` · `reflow` · `frontmatter`, `fetch`한 · `provide`하는 · `named export`해)

C-3과의 경계는 '원전에 그 이름으로 실려 있는가'로 판단 (예: `React의 Context API를 사용해 페이지 별 전역 context를 활용했습니다.` — React 공식 API 이름인 `Context API`는 대문자, 그것으로 만든 값 일반을 가리키는 `context`는 소문자)

### C-5. 문두 · 헤딩에서는 대문자

C-4에 따라 소문자로 쓰는 단어라도 문장 · 리스트 항목의 첫 위치에 오면 대문자로 시작. 같은 문장 안이라도 첫 위치가 아니면 소문자로 되돌림 (예: `Template과 page는...`, `Context를 provide하는 부분은 문맥상 page 안에...`)

헤딩은 영문 헤딩 · 한글 헤딩 내 영어 모두 Title Case (예: `## Pain Point`, `## Masonry Layout`, `### Repaint 범위 개선하기` — 본문에서는 `repaint`)

### C-6. 병기 표기

- 괄호 병기는 한글(영문) 순서로 표기 (예: `CMS(Content Management System)`, `성능(Performance) 탭`, `**관심사의 분리**_(Separation of Concerns)_`)
- `<sub>` 루비 병기의 영문은 소문자 (예: `'**스포트라이트<sub>spotlight</sub> 효과**'`)
- 음차가 정착된 용어는 영어로 표기하지 않고 한글로 씀 (컴포넌트 · 리팩토링 · 프론트엔드 · 스크롤 · 레이아웃 · 애니메이션 · 브라우저 · 캐시 · 렌더링)

### C-7. 조사 연결

영어 단어 뒤 조사는 표기 형태와 무관하게 공백 없이 바로 붙임 (`molecule과` · `Atom부터` · `CSS의` · `props를`)

## 링크

### L-1. 인라인 링크는 자유 표기

본문 문장 안에 자연스럽게 녹아드는 링크는 앵커 텍스트 형식을 고정하지 않음. 문맥에 맞게 자유롭게 표기 (예: `[Omer Doron의 포스트](...)에서 발췌했습니다`, `[여기](...)서 확인하실 수 있습니다`, `[Intersection Observer API](...)는`)

### L-2. 참조 링크는 `제목 | 저자 또는 매체`

콜아웃(`- 참고: [...]`)이나 글 끝 `## 참고` 섹션의 리스트처럼, 공식 문서 · 외부 포스트를 참조 링크로 거는 경우의 앵커 텍스트는 `{글 제목} | {저자 또는 매체}` 형식으로 통일

저자 · 매체는 링크에 따라 생략 가능하며(제목만 표기), 표기하는 경우에만 이 형식을 따름. 고정 대상은 파이프(` | `, 양쪽 공백 포함) 구분과 그 앞의 원문 제목이고, 파이프 뒤에 무엇을 쓸지는 자유:

- 파이프 뒤에는 문서명 · 저자명 · 플랫폼(핸들) · 기술 블로그명 등 상황에 맞는 것을 자유롭게 선택 (예: `| MDN Web Docs` · `| Brad Frost` · `| Velog(@hayoung474)` · `| 카카오엔터테인먼트 FE 기술블로그`)
- 제목은 원문 타이틀 그대로 사용하며, 저자 · 매체를 제목 쪽 괄호에 넣지 않음 (`[Atomic Design Methodology (Brad Frost)]` ❌ → `[Atomic Design Methodology | Brad Frost]` ✅)

## Frontmatter

### F-1. 홑따옴표 포함 YAML 문자열

frontmatter의 YAML 문자열 값에 ASCII 홑따옴표가 포함되면 바깥 따옴표를 겹따옴표로 감쌈 (예: `description: "...'스포트라이트 효과'를..."`) — 홑따옴표로 감싸면 YAML 파싱이 깨짐

## 나열 구분자

### S-1. 중간점과 슬래시 혼용

나열식 병기의 구분자로 중간점(` · `, 양쪽 공백 포함)과 슬래시를 모두 허용. 상황에 따라 자유롭게 혼용 가능하며 통일 대상 아님 (예: `색상 · 타이포그래피 · 간격`)
