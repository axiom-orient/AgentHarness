# SPEC

## Core requirements

### R1. Repository instruction

저장소는 agent가 가장 먼저 읽을 짧은 repository-level instruction을 제공해야 한다.

Acceptance:
- `AGENTS.md`가 존재한다.
- durable product/architecture knowledge 전체를 중복하지 않는다.
- material semantic change에 대한 escalation condition을 명시한다.

### R2. Durable knowledge

제품 의도, architecture, specification, implementation status, 남은 계획은 repository 안의 명시적 canonical documents에 저장되어야 한다.

Acceptance:
- Current fact와 normative contract가 분리된다.
- 완료된 일과 남은 일을 같은 PLAN에서 혼동하지 않는다.
- 동일 concern의 authority가 여러 문서에 중복되지 않는다.

### R3. Non-trivial change intent

비단순 변경은 구현 전후에 변경 목적·범위·risk·verification을 추적할 수 있어야 한다.

Acceptance:
- execution-plan template을 제공한다.
- public contract/schema/security/concurrency/retry/idempotency 등 material semantics 변경은 review/escalation 대상이다.

### R4. Verification entry

채택된 repository는 하나의 명확한 verification entry를 제공해야 한다.

Input:
- working tree / build environment

Output:
- 성공: 실제 실행된 required checks가 모두 성공
- 실패: 하나 이상의 required check 실패 또는 필수 verification이 아직 wiring되지 않음

Acceptance:
- placeholder command가 성공 exit code로 verification complete를 표현해서는 안 된다.
- 어떤 checks가 실행됐는지 식별 가능해야 한다.
- 최소 검증만 실행하더라도 적용 범위를 명시해야 한다.

### R5. Review evidence

완료된 material change는 최소 다음 evidence를 남겨야 한다.

- 무엇이 변경됐는가
- 왜 변경됐는가
- 무엇을 실제로 검증했는가
- 무엇을 검증하지 못했는가
- 남은 risk/unknown이 있는가

형식은 특정 PR provider나 agent vendor에 종속되지 않는다.

### R6. Boundary template

architecture boundary enforcement example을 제공할 수 있다.

Acceptance:
- example policy는 target/example임을 명시한다.
- 실제 project에 wiring되지 않은 config를 active enforcement라고 표현하지 않는다.

## Optional capabilities

- `.agents/skills/*` reusable skills
- GitHub Actions automation
- dependency-cruiser / ESLint boundaries examples
- docs gardening / cleanup automation
- metrics capture templates
- Codex-specific environment configuration
- example domain folder skeleton

Optional capability가 없어도 core identity는 유지되어야 한다.

## Inputs / outputs / failure semantics

| Surface | Input | Output | Failure semantics |
|---|---|---|---|
| `AGENTS.md` | agent task + repo context | repository rules | host가 읽지 않거나 준수하지 않으면 enforcement 없음 |
| execution plan | non-trivial change intent | versioned plan artifact | required decision/verification가 비어 있으면 incomplete |
| `scripts/verify.sh` | working tree | verification result | unwired required check는 success로 취급 금지 |
| `scripts/run-tests.sh` | working tree | targeted/full test result | tests 미구현/미설정은 explicit NOT_RUN 또는 failure |
| boundary config | import graph | policy violations | invocation/toolchain 미설정은 UNWIRED |
| skill template | task/context | procedural guidance | host selection/execution 미검증 시 qualification UNKNOWN |

## Intentional public contract

이 저장소의 intentional public surface는 **복사/채택 가능한 파일 contract와 그 의미**다.

Core:
- `AGENTS.md`
- `WORKFLOW.md`
- `docs/design-docs/*`
- `docs/product-specs/*`
- `docs/exec-plans/*`
- `scripts/verify.sh`

Optional examples:
- `.agents/skills/*`
- `.github/workflows/*`
- `tooling/*`
- `.codex/*`
- `scripts/run-app.sh`, `scripts/run-tests.sh`, `scripts/docs-audit.sh`, `scripts/capture-metrics.sh`

파일명 자체의 장기 compatibility를 보장하는 versioned API는 현재 정의되어 있지 않다. 외부 downstream 소비 여부는 UNKNOWN이므로 destructive rename/removal 전 consumer 확인이 필요하다.

## Observable behavior

현재 template repository 자체에서 요구되는 observable behavior는 application behavior가 아니다.

- repository guidance와 templates를 읽을 수 있다.
- GitHub verification workflow가 shell verification entry를 호출한다.
- adopter는 placeholder entry를 자신의 real toolchain으로 대체해야 한다.
- empty example-domain은 runnable application으로 간주되지 않는다.

## Non-requirements

다음은 AgentHarness 자체가 제공한다고 주장해서는 안 된다.

- runnable product/application
- application business logic
- database persistence
- network/provider integration
- application-level retries/idempotency/cancellation
- runtime telemetry/tracing
- end-user UI
- integration test suite
