# AgentHarness

AgentHarness는 **agent-first software repository를 위한 최소 운영 template set**이다.

실행형 agent runtime이나 application framework가 아니다. 인간과 code agent가 같은 repository에서 예측 가능하게 변경하기 위해 필요한 **repository contract, durable intent/spec, execution/verification entry, reviewable evidence**를 제공한다.

## Core

- `AGENTS.md` — agent가 가장 먼저 읽는 짧은 repository rule
- `WORKFLOW.md` — human/agent authority와 task lifecycle
- `docs/design-docs/` — durable design template
- `docs/product-specs/` — product/spec template
- `docs/exec-plans/` — non-trivial change execution-plan template
- `scripts/verify.sh` — adopter가 실제 toolchain에 연결해야 하는 verification entry

## Optional examples

- `.agents/skills/` — reusable agent skills
- `.github/workflows/` — CI/maintenance workflow examples
- `tooling/` — dependency-boundary examples
- `.codex/` — Codex environment example
- `packages/example-domain/` — empty architecture skeleton; runnable product가 아님

## 현재 중요한 제한

이 repository 자체에는 application domain/runtime/UI/database/network/provider가 구현되어 있지 않다.

현재 `scripts/verify.sh`, `scripts/run-tests.sh`, `scripts/run-app.sh`도 실제 project command가 연결되지 않은 **placeholder**다. 따라서 template 상태의 CI success는 product correctness verification을 의미하지 않는다.

## Adoption

1. `docs/IDENTITY_AND_EVOLUTION.md`와 `docs/SPEC.md`를 실제 제품에 맞춘다.
2. `AGENTS.md`에 실제 repository constraints와 escalation rule을 반영한다.
3. `docs/ARCHITECTURE.md`에 실제 owner/dependency/boundary를 기록한다.
4. `scripts/verify.sh`와 필요 시 `run-tests.sh`/`run-app.sh`를 실제 toolchain에 연결한다.
5. optional skill/CI/boundary tooling 중 실제 사용할 것만 wiring한다.
6. 대표 non-trivial change 하나를 `plan → implementation → verification → evidence`로 끝까지 닫는다.

위 단계가 끝나기 전에는 이 repository를 **adopted product repository**가 아니라 template 상태로 취급한다.

## Canonical documents

- [정체성과 발전 방향](docs/IDENTITY_AND_EVOLUTION.md)
- [제품/운영 규격](docs/SPEC.md)
- [아키텍처](docs/ARCHITECTURE.md)
- [현재 구현 상태](docs/IMPLEMENTATION_STATUS.md)
- [상세 분석](docs/ANALYSIS.md)
- [남은 작업](docs/PLAN.md)

`SECURITY.md`와 `WORKFLOW.md`는 독립 목적의 operational guidance다. `THEORY_SUMMARY_KO.md`는 설명 자료이며 canonical implementation authority가 아니다.
