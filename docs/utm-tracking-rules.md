# UTM Tracking Specification

이 문서는 기술 블로그 프로젝트의 트래픽 분석(Vercel Analytics 및 Google Analytics 4)을 위한 UTM 파라미터 규칙을 정의합니다.

---

## 📋 현재 사용 중인 UTM 링크 목록 (업데이트용)

이 표는 실제로 사용 중이거나 사용할 예정인 UTM 링크들을 관리하기 위한 표입니다. 새로운 링크를 배포할 때마다 이 표를 업데이트해 주세요.

| 배포처 / 대상 | URL (UTM 파라미터 포함) | 비고 |
| --- | --- | --- |
| GitHub 프로필 | `?utm_source=github&utm_medium=social&utm_campaign=profile` | - |
| GitHub README 소개글 | `?utm_source=github&utm_medium=social&utm_campaign=readme` | - |
| GitHub poodle-blog 레포 | `?utm_source=github&utm_medium=social&utm_campaign=repo-poodle-blog` | - |
| PDF 이력서 | `?utm_source=resume&utm_medium=referral&utm_campaign=ver_260319` | - |
| 링크드인 | `?utm_source=linkedin&utm_medium=social&utm_campaign=profile` | - |
| 원티드 | `?utm_source=wanted&utm_medium=referral&utm_campaign=apply` | - |

---

## 기본 원칙

1. **소문자 및 하이픈 사용**: 모든 파라미터 값은 소문자와 하이픈(`-`)으로 작성합니다. (예: `camelCase`, `snake_case` 금지)
2. **축약어 지양**: 직관적인 분석을 위해 명확한 단어를 사용합니다. (예: `fe` 대신 `frontend-engineer`)
3. **GA4 기본 채널 그룹 준수**: `utm_medium`은 GA4가 인식할 수 있는 표준 값(`referral`, `social` 등)을 사용하여 'Unassigned'로 분류되는 것을 방지합니다.
4. **캠페인 단위 묶음**: 목적에 따라 `utm_campaign`을 `profile`, `repo-{레포명}`, `apply-{회사명}-{직무명}`, `ver-{yymmdd}` 등으로 명확히 분류하여 유입 의도를 파악합니다.
5. **UTM 파라미터 사용 범위**: 일관적인 규칙 작성을 위해 `utm_source`, `utm_medium`, `utm_campaign` 이외의 속성은 필요한 경우를 제외하고 최대한 배제합니다.

---

## 파라미터 정의

| 파라미터       | 역할                             | 예시                                      |
| -------------- | -------------------------------- | ----------------------------------------- |
| `utm_source`   | 트래픽 출처 (어디서 왔는가)      | `github`, `wanted`, `resume`, `portfolio` |
| `utm_medium`   | 채널 유형 (어떤 매체인가)        | `referral`, `social` |
| `utm_campaign` | 캠페인 목적 (왜 왔는가)          | `profile`, `repo-{레포명}`, `apply-{회사명}-{직무명}`, `ver-{yymmdd}` |

---

## 채널별 UTM 규칙

### 1. 구글 검색 (Organic Search)

유기 검색 트래픽은 GA4에서 자동으로 `source=google`, `medium=organic`으로 분류합니다.

- **규칙**: UTM 파라미터를 추가하지 않습니다. (자동 추적 위임)

### 2. GitHub

GitHub 프로필, README, 개별 레포지토리에서 유입되는 트래픽입니다.

- `utm_source`: `github`
- `utm_medium`: `social`
- `utm_campaign`: `profile` (프로필 링크), `readme` (README 소개글), 또는 `repo-{레포명}` (개별 레포지토리)

**예시 링크:**

- 프로필 소개글: `?utm_source=github&utm_medium=social&utm_campaign=profile`
- README 소개글: `?utm_source=github&utm_medium=social&utm_campaign=readme`
- 특정 레포지토리 (poodle-blog): `?utm_source=github&utm_medium=social&utm_campaign=repo-poodle-blog`

### 3. 이력서 및 포트폴리오

PDF 형태의 이력서나 웹 포트폴리오 문서에서 유입되는 트래픽입니다.

- `utm_source`: `resume` (이력서) 또는 `portfolio` (포트폴리오)
- `utm_medium`: `referral`
- `utm_campaign`: `ver-{yymmdd}` (버전/배포일자)

**예시 링크:**

- PDF 이력서 (2026년 3월 19일 버전): `?utm_source=resume&utm_medium=referral&utm_campaign=ver_260319`

### 4. 채용 플랫폼 및 공고 지원

원티드, 링크드인 등 각종 채용 플랫폼을 통해 지원할 때 제출하는 링크입니다.

- `utm_source`: `{플랫폼명}` (예: `wanted`, `linkedin`)
- `utm_medium`: `referral` (일반 플랫폼) 또는 `social` (소셜 미디어)
- `utm_campaign`: `profile` (플랫폼 내 프로필), `apply` (일반 지원), 또는 `apply-{회사명}-{직무명}` (특정 공고 지원)

**예시 링크:**

- 링크드인 프로필: `?utm_source=linkedin&utm_medium=social&utm_campaign=profile`
- 원티드 일반 지원: `?utm_source=wanted&utm_medium=referral&utm_campaign=apply`
- 특정 공고 지원 (올리브영 프론트엔드): `?utm_source=wanted&utm_medium=referral&utm_campaign=apply-oliveyoung-frontend`

---

## 데이터 분석 방법 (GA4 / Vercel Analytics)

1. **GitHub 유입 확인**:
   - 필터: `Source` = `github`
   - `Campaign` 값을 통해 프로필(`profile`), README(`readme`), 특정 레포지토리(`repo-...`) 중 어디서 왔는지 세부 확인이 가능합니다.
2. **이력서 버전별 성과 비교**:
   - 필터: `Source` = `resume`
   - `Campaign`의 `ver-{yymmdd}` 값을 비교하여 특정 버전의 이력서에서 얼마나 유입되었는지 파악합니다.
3. **채용 플랫폼 유입 확인**:
   - `Source`가 `wanted`, `linkedin` 등인지 확인하고, `Campaign`을 통해 단순 프로필 열람(`profile`)인지 특정 공고 지원(`apply-...`)인지 구분합니다.
