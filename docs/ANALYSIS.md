# AgentHarness 분석

## Verdict

- **정체성:** 실행형 agent runtime이 아니라, agent-first software repository를 운영하기 위한 **template set / repository operating model**이다.
- **주요 caller:** 저장소를 시작·운영하는 인간과 코드 에이전트.
- **핵심 가치:** 짧은 agent instruction, 지속 문서, 실행 계획, 반복 가능한 skill, 검증/CI/boundary template을 한 저장소 규약으로 제공한다.
- **현재 상태:** 실제 제품 domain/runtime/UI는 구현되어 있지 않다. `packages/example-domain/*`는 `.gitkeep` skeleton이다. 실행·테스트·검증 script 대부분은 placeholder다.
- **방향:** **SIMPLIFY**. 범용 runtime으로 확장하지 말고, template의 contract·adoption path·검증 truth를 더 명시적으로 만들고 placeholder를 사실대로 표시해야 한다.
- **확신도:** 높음. repository tree, scripts, workflow, root docs를 직접 확인했다.

## 책임 경계

### Material unit

이 저장소에서 독립적으로 의미를 소유하는 material unit은 하나다.

**Agent-first repository template system**

포함:
- `AGENTS.md`: agent 작업 규칙
- `WORKFLOW.md`: 인간/agent 작업 수명주기
- `.agents/skills/*`: 반복 작업 prompt/skill template
- `docs/design-docs/*`, `docs/product-specs/*`, `docs/exec-plans/*`: 지속 지식과 계획 template
- `scripts/*`: 채택 프로젝트가 wiring해야 하는 실행/검증 entry template
- `.github/workflows/*`: script entry를 호출하는 CI/maintenance template
- `tooling/*`: dependency boundary enforcement example
- `.codex/*`: Codex 환경 예시

### 상위 포함 / 제외

- `packages/example-domain/*`: 독립 제품이 아니다. architecture 예시용 empty skeleton이다.
- `docs/references/*`: runtime input이 아니라 참고 자료 예시다.
- `SECURITY.md`: template 사용 시 적용할 security guidance다. 제품 보안 구현 증거가 아니다.
- 실제 application/service/database/network/provider: **ABSENT_IN_SCOPE**.

## Material boundary

| Surface·활성 조건 | Caller→Handler | Input·검증 | State/Effect owner | Output·Failure | 근거 |
|---|---|---|---|---|---|
| Agent instruction / agent가 repo에서 작업 | agent → `AGENTS.md` | task + repository context; 강제 parser 없음 | 인간이 작성한 repo policy | 작업 규칙/에스컬레이션; 준수 여부는 agent/runtime 의존 | `AGENTS.md` |
| Non-trivial task planning | human/agent → `docs/exec-plans/active/*` | 요구사항; schema enforcement 없음 | plan markdown | versioned execution intent | `WORKFLOW.md`, plan template |
| Verification entry | developer/CI → `scripts/verify.sh` | shell environment | shell script | 현재는 TODO 문자열; 실제 format/lint/typecheck/test 없음 | `scripts/verify.sh` |
| CI verification | push/PR → GitHub Actions → `scripts/verify.sh` | checkout | GitHub Actions | job success/failure; 현재 script가 실검증을 하지 않아 green≠verified | `.github/workflows/verify.yml` |
| Local app entry | developer/agent → `scripts/run-app.sh` | shell | shell script | 현재 TODO 문자열; app process 없음 | `scripts/run-app.sh` |
| Local tests | developer/agent → `scripts/run-tests.sh` | shell | shell script | 현재 TODO 문자열; tests 없음 | `scripts/run-tests.sh` |
| Dependency policy template | adopter/tool → `tooling/depcruise.config.cjs` 또는 eslint example | source import graph | external boundary tool | forbidden dependency diagnostics; package/tool wiring 없음 | `tooling/*` |
| Reusable skill | agent runtime → `.agents/skills/*/SKILL.md` | task/context | agent runtime + skill text | task-specific guidance; deterministic execution contract는 없음 | `.agents/skills/*` |

## 대표 E2E 경로

현재 repository 자체에서 닫히는 가장 구체적인 실행 경로는 CI verification template이다.

```text
push / pull_request
→ GitHub Actions verify job
→ checkout
→ bash scripts/verify.sh
→ four TODO echo groups
→ shell exits 0
→ workflow reports success
```

이 경로에서 실제 formatter, linter, typechecker, tests는 호출되지 않는다. 따라서 현재 성공은 **template script가 실행 가능함**만 의미하며 application correctness 검증이 아니다.

Agent task lifecycle은 문서 수준에서 다음처럼 정의되어 있으나 강제 runtime은 없다.

```text
request
→ read docs/spec
→ create/update execution plan
→ implement
→ verification
→ docs/spec/tests sync
→ PR summary
→ review/escalation
```

이 흐름의 owner는 중앙 orchestrator가 아니라 human/agent workflow convention이다.

## State / contract / I/O owner

- **상태 owner:** application state는 없다. 지속 상태는 Git repository files와 Git history가 소유한다.
- **workflow authority:** `AGENTS.md` + `WORKFLOW.md`; 강제 executor는 없다.
- **architecture authority(Current 문서):** root `ARCHITECTURE.md`는 target layer pattern을 설명하지만 실제 package implementation의 관찰 결과가 아니다.
- **verification owner:** entry는 `scripts/verify.sh`; 실제 검증 명령 owner는 아직 없음.
- **CI owner:** `.github/workflows/*`; 대부분 local scripts/templates를 호출하는 wrapper다.
- **boundary owner:** dependency-cruiser/eslint config example. manifest 및 invocation wiring이 없어 현재 enforcement는 UNWIRED다.
- **I/O:** repository file read/write와 GitHub Actions shell execution만 material하다. database/network/application process는 없다.

## 기능 현황

| 기능 | 연결 상태 | 계약 충족 상태 | 검증·적용 범위 | 근거 |
|---|---|---|---|---|
| Agent repo guidance | PUBLIC_LIBRARY | SATISFIED | 문서 존재/내용 검사 | `AGENTS.md` |
| Human/agent task workflow | PUBLIC_LIBRARY | SATISFIED | 문서 contract | `WORKFLOW.md` |
| Execution plan template | PUBLIC_LIBRARY | SATISFIED | template 제공 | `docs/exec-plans/active/PLAN_TEMPLATE.md` |
| Product/design spec templates | PUBLIC_LIBRARY | SATISFIED | template 제공 | `docs/product-specs`, `docs/design-docs` |
| Reusable agent skills | PUBLIC_LIBRARY | PARTIAL | skill text 존재; host별 실행/selection 검증 없음 | `.agents/skills/*` |
| Application runtime | ABSENT_IN_SCOPE | NOT_IMPLEMENTED | N/A: template repo | empty `packages/example-domain/*` |
| Local test execution | UNWIRED | NOT_IMPLEMENTED | NOT_RUN: command placeholder | `scripts/run-tests.sh` |
| Format/lint/type/test verification | UNWIRED | NOT_IMPLEMENTED | NOT_RUN: command placeholder | `scripts/verify.sh` |
| CI verification orchestration | REACHABLE | PARTIAL | workflow→placeholder script 연결만 확인 | `.github/workflows/verify.yml` |
| Dependency boundary enforcement | UNWIRED | PARTIAL | config example만 존재 | `tooling/*` |
| Reliability observability | ABSENT_IN_SCOPE | NOT_IMPLEMENTED | N/A: app runtime 없음 | `RELIABILITY.md`는 guidance뿐 |
| Security runtime enforcement | ABSENT_IN_SCOPE | NOT_IMPLEMENTED | N/A: app runtime 없음 | `SECURITY.md`는 guidance뿐 |

## 실패·취소·재시도·복구

Application operation이 없으므로 application-level cancellation/retry/idempotency semantics는 존재하지 않는다.

Repository workflow 관점에서는:
- shell scripts는 `set -euo pipefail`을 사용하지만 placeholder 명령만 있는 경우 실패 surface가 거의 없다.
- CI job retry/recovery policy를 이 repository가 별도로 정의하지 않는다.
- plan/PR/review 변경은 Git history로 추적 가능하지만 formal transaction/rollback protocol은 없다.
- agent destructive/external actions에 대한 approval 원칙은 security guidance에 있으나 executable enforcement가 아니다.

## Findings

### F1 — CI green이 검증 완료처럼 보일 수 있음

**문제 →** `verify` workflow가 실제 검증 없이 성공할 수 있다.

**근거 →** workflow는 `scripts/verify.sh`만 실행하고, 해당 script는 formatter/linter/typechecker/tests 대신 TODO를 출력한다.

**원인 →** adopter가 교체할 template placeholder를 runnable CI에 직접 연결했다.

**영향 →** template 자체의 smoke check와 product verification 의미가 혼동된다.

**방향 → IMPROVE.** placeholder 상태를 명시적으로 fail하거나, template repository에서는 CI 이름/문서를 “template wiring check”로 제한하고 실제 project adoption 이후에만 verification gate가 되도록 계약을 분리한다.

### F2 — `QUALITY_SCORE.md`가 존재하지 않는 runtime 사실을 주장

**문제 →** Core domain, runtime logs/traces, UI empty states, integration tests gap을 Current처럼 기록한다.

**근거 →** 실제 domain/runtime/UI는 empty skeleton이고 tests도 없다.

**원인 →** example scorecard가 예시 표식 없이 repository current 상태처럼 저장됐다.

**영향 →** agent가 허구의 current state를 근거로 작업할 수 있다.

**방향 → REMOVE.** 예시가 필요하면 명백한 template 파일로 다시 만들 수 있으나, 현재 명칭의 authoritative-looking scorecard는 제거한다.

### F3 — Architecture document가 example target과 Current를 구분하지 않음

**문제 →** `types -> config -> repo -> service -> runtime -> ui`를 repository architecture처럼 기술한다.

**근거 →** 해당 folders는 `.gitkeep`뿐이며 실제 imports/owners가 없다.

**원인 →** adopter용 architecture template과 이 repository 자체 architecture를 한 문서에서 혼합했다.

**영향 →** implementation evidence 없는 dependency model이 Current로 오인된다.

**방향 → SIMPLIFY.** repository 자체 architecture와 adopter target template을 분리하고, target layer example은 예시임을 명시한다.

### F4 — 강한 agent-first 원칙에 비해 enforceable contract가 얇음

**문제 →** plan/update/docs-sync/escalation 규칙은 명확하지만 host-independent completion/evidence contract가 없다.

**근거 →** 대부분 Markdown instruction이고, verification/skills selection에 machine-checkable completion evidence가 없다.

**원인 →** 초기 template이 process guidance 중심으로 설계됐다.

**영향 →** 다른 agent host에서 같은 repository를 사용해도 completion 의미가 달라질 수 있다.

**방향 → IMPROVE.** 특정 agent vendor ABI를 추가하는 대신, 최소한의 task evidence contract(변경 범위, 검증 command/result, unresolved risk)를 repository artifact 수준에서 고정한다.

### F5 — Template surface가 여러 root 문서로 분산됨

**문제 →** architecture, product sense, reliability, quality, workflow, theory가 모두 root authority처럼 보인다.

**원인 →** 설명 자료와 normative contract가 함께 성장했다.

**영향 →** agent의 first-read context가 커지고 Current/규범/예시 경계가 약해진다.

**방향 → SIMPLIFY.** canonical docs를 `docs/IDENTITY_AND_EVOLUTION.md`, `SPEC.md`, `ARCHITECTURE.md`, `IMPLEMENTATION_STATUS.md`, `PLAN.md`로 제한하고 root에는 README/AGENTS 및 독립 목적이 있는 SECURITY/WORKFLOW만 남기는 방향이 적합하다.

## KEEP / INTEGRATE / REMOVE / UNKNOWN

### KEEP
- `AGENTS.md` — 짧은 repo-specific agent rule로 가치 있음.
- `WORKFLOW.md` — task lifecycle의 독립 독자가 있음.
- `.agents/skills/*` — reusable templates; 다만 qualification 필요.
- `docs/design-docs/*`, `docs/product-specs/*`, `docs/exec-plans/*` — template product의 핵심 artifact.
- `scripts/*`, `.github/workflows/*`, `tooling/*` — adoption wiring example. placeholder 상태는 명시해야 함.
- `SECURITY.md` — 독립적인 security guidance 목적이 있음.

### INTEGRATE
- `PRODUCT_SENSE.md` → `docs/IDENTITY_AND_EVOLUTION.md` / `docs/SPEC.md`.
- root `ARCHITECTURE.md` → canonical `docs/ARCHITECTURE.md`에서 repository architecture와 adopter example을 분리.
- `RELIABILITY.md` → template requirements로 필요한 부분을 `SPEC`/`ARCHITECTURE`에 통합하거나 명백한 optional guidance로 유지 결정.
- `THEORY_SUMMARY_KO.md` → 설명 자료로 유지 가능하지만 normative authority가 아님을 README에서 분리 표시.

### REMOVE
- `QUALITY_SCORE.md` 현재 내용. Current evidence와 충돌한다.

### UNKNOWN
- 실제 외부 사용자가 현재 root filename을 자동화에서 참조하는지 여부.
- 각 `.agents/skills`가 어떤 host에서 자동 discovery/selection 되는지와 실제 성공률.
- GitHub workflow들이 실제 repository에서 최근 실행됐는지 여부. 이번 분석은 workflow definition과 reachable file wiring을 확인했으며 run history는 검사하지 않았다.

## 검증 범위

- repository default branch tree 전체 path를 확인했다.
- 주요 root contract, skeleton package, scripts, verification workflow, dependency config를 확인했다.
- application runtime/build/test는 구현 자체가 없어 실행하지 않았다.
- 외부 agent host에서 skills 실행은 수행하지 않았다.
