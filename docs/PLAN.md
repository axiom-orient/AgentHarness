# PLAN

완료된 작업은 이 문서에 남기지 않는다. 아래는 현재 확인된 gap만 소유한다.

## P0 — Verification truth 복구

### Current
- `.github/workflows/verify.yml`은 `scripts/verify.sh`를 호출한다.
- `scripts/verify.sh`는 format/lint/typecheck/test를 실제로 실행하지 않고 TODO를 출력한 뒤 성공한다.

### Normative basis
- `SPEC R4`: required verification이 wiring되지 않은 상태는 verification success가 아니다.

### Preserve
- 단일 verification entry라는 구조.
- adopter가 자신의 toolchain을 연결할 수 있는 범용성.

### Change
- template repository 자체에서는 placeholder verification이 실제 품질 gate처럼 보이지 않도록 의미를 변경한다.
- adopter가 actual commands를 연결한 이후에만 `verify`가 quality gate가 되도록 명시한다.

### Impact
- `scripts/verify.sh`
- `.github/workflows/verify.yml`
- 관련 skill/document wording

### Completion
- unwired check가 성공으로 보고되지 않는다.
- CI label/description과 실제 수행 의미가 일치한다.
- 적용 범위와 NOT_RUN을 구분할 수 있다.

### Verification
- shell exit semantics 검사
- workflow→script wiring 검사

## P0 — False Current 제거

### Current
`QUALITY_SCORE.md`가 존재하지 않는 Core domain/runtime/UI/tests 상태를 Current처럼 점수화한다.

### Normative basis
Current claim은 reachable implementation/evidence보다 강할 수 없다.

### Preserve
- quality gap을 측정한다는 아이디어 자체는 필요 시 재사용 가능.

### Change
- 현재 `QUALITY_SCORE.md`는 제거.
- scorecard가 실제로 필요해질 때 implementation evidence 기반 artifact로 새로 정의한다.

### Completion
- repository에 구현되지 않은 runtime/test/UI를 현재 사실처럼 주장하는 문서가 없다.

## P1 — Root authority 단일화

### Current
`ARCHITECTURE.md`, `PRODUCT_SENSE.md`, `RELIABILITY.md`, `THEORY_SUMMARY_KO.md` 등이 root에서 서로 다른 수준의 규범/설명 역할을 가진다.

### Target
Canonical authority는 다음으로 제한한다.
- `docs/IDENTITY_AND_EVOLUTION.md`
- `docs/SPEC.md`
- `docs/ARCHITECTURE.md`
- `docs/IMPLEMENTATION_STATUS.md`
- `docs/PLAN.md`
- 세부 근거 `docs/ANALYSIS.md`

`AGENTS.md`, `WORKFLOW.md`, `SECURITY.md`는 독립 목적의 operational documents로 유지할 수 있다.

### Dependency
외부 consumer가 legacy root path를 참조하는지 확인해야 한다.

### Completion
- 각 concern에 canonical owner가 하나다.
- root README와 AGENTS가 canonical paths를 가리킨다.
- legacy docs를 유지한다면 명백한 non-authoritative pointer/guide다.

## P1 — Agent skill qualification

### Current
`.agents/skills/*`는 reusable text/template로 존재하지만 실제 agent host에서 discovery/selection/completion이 검증되지 않았다.

### Preserve
- vendor-independent repository contract.
- 작은 task-specific skill surface.

### Change
- 지원할 host를 정한 뒤 대표 task set으로 trigger/non-trigger, required-question behavior, action continuation, completion evidence를 측정한다.

### Completion
- 각 skill의 intended trigger와 non-trigger가 명시됨.
- 최소 qualification evidence가 repository에 남음.
- 실패한 host-specific assumption이 core contract에 스며들지 않음.

## P2 — Adoption acceptance contract

### Current
README에는 customize 순서가 있으나, 언제 template adoption이 완료되었다고 볼지 명확한 acceptance criteria가 없다.

### Target
다음이 모두 충족되면 adopted 상태로 본다.
- `AGENTS.md`가 실제 repository constraints를 반영
- canonical identity/spec/architecture가 실제 product에 맞게 채워짐
- verification entry가 real toolchain에 연결됨
- 최소 one representative change flow가 plan→implementation→verification→evidence로 닫힘
- optional tooling은 wired/unwired가 명시됨

### Completion
- README 또는 onboarding 문서에서 위 acceptance가 명시됨.
- placeholder 상태와 adopted 상태를 혼동하지 않음.
