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

## UNKNOWN / decision dependency

- legacy root document path를 외부 downstream repository가 자동 참조하는지는 확인되지 않았다. 따라서 `ARCHITECTURE.md`, `PRODUCT_SENSE.md`, `RELIABILITY.md`는 삭제 대신 canonical docs를 가리키는 compatibility entry로 유지한다.
- 실제 adopted repository에서 어떤 verification command가 필수인지는 이 template repository가 결정할 수 없다.
