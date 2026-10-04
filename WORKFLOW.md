# WORKFLOW.md

## Operating model

Humans steer. Agents execute.

Humans are responsible for:

- prioritization
- constraint setting
- acceptance criteria
- final judgment on ambiguous trade-offs

Agents are responsible for:

- implementation
- local verification
- documentation sync
- repetitive maintenance
- PR drafting and first-pass review summaries

## Standard task lifecycle

1. understand the request
2. read relevant docs and specs
3. create or update an execution plan for non-trivial work
4. implement in an isolated worktree when possible
5. run verification
6. update docs/spec/tests
7. draft PR summary
8. request review or escalate if ambiguity remains

## Task classes

### Trivial
Examples:
- typo fix
- comment cleanup
- broken import
- failing test with obvious cause

Execution plan optional.

### Standard
Examples:
- small feature
- localized bug fix
- docs + code sync
- refactor within one module

Execution plan recommended.

### Non-trivial
Examples:
- API change
- schema change
- workflow change
- auth or billing touch
- multi-package change
- concurrency or retry logic change

Execution plan required.

## PR expectations

Every PR summary should answer:

- what changed
- why it changed
- what was verified
- what remains risky
- what docs/specs were updated

## Escalation rules

Escalate to a human before merge when:

- acceptance criteria conflict
- security posture changes
- production data semantics change
- tests are insufficient for the risk level
- rollback is unclear

## Adoption

1. `docs/IDENTITY_AND_EVOLUTION.md`와 `docs/SPEC.md`를 실제 제품에 맞춘다.
2. `AGENTS.md`에 실제 repository constraints와 escalation rule을 반영한다.
3. `docs/ARCHITECTURE.md`에 실제 owner/dependency/boundary를 기록한다.
4. `scripts/verify.sh`와 필요 시 `run-tests.sh`/`run-app.sh`를 실제 toolchain에 연결한다.
5. optional skill/CI/boundary tooling 중 실제 사용할 것만 wiring한다.
6. 대표 non-trivial change 하나를 `plan → implementation → verification → evidence`로 끝까지 닫는다.

위 단계가 끝나기 전에는 이 repository를 **adopted product repository**가 아니라 template 상태로 취급한다.
