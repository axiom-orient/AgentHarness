# ARCHITECTURE

## System boundary

AgentHarness의 실제 시스템 경계는 application runtime이 아니라 **repository artifact graph**다.

```text
human intent
   │
   ├─> AGENTS.md
   ├─> WORKFLOW.md
   ├─> docs/* canonical + templates
   └─> .agents/skills/*

repository change
   │
   ├─> scripts/* entrypoints
   ├─> tooling/* optional boundary policy
   └─> .github/workflows/* orchestration

Git / GitHub
   └─> durable history + CI result
```

## Confirmed boundaries and owners

### Repository policy
Owner: `AGENTS.md`

책임:
- agent first-read rules
- escalation conditions
- required review posture

비책임:
- product specification 전체
- implementation status
- architecture detail 전체

### Task workflow
Owner: `WORKFLOW.md`

책임:
- human/agent authority split
- task classification
- standard change lifecycle
- review/escalation flow

### Canonical product knowledge
Owners:
- `docs/IDENTITY_AND_EVOLUTION.md`
- `docs/SPEC.md`
- `docs/ARCHITECTURE.md`
- `docs/IMPLEMENTATION_STATUS.md`
- `docs/PLAN.md`

규칙:
- Current는 `IMPLEMENTATION_STATUS`/`ANALYSIS`가 소유한다.
- normative identity/spec/architecture는 Current test 결과를 소유하지 않는다.
- future work는 `PLAN`만 소유한다.

### Verification
Owner: `scripts/verify.sh`

현재 entry는 존재하지만 actual check implementation은 없다.

Target contract:

```text
working tree
→ smallest required checks
→ explicit per-check result
→ aggregate success only if all required checks ran and passed
```

CI는 verification semantics를 재정의하지 않고 이 entry를 호출해야 한다.

### Optional tooling
Owners:
- `.agents/skills/*`
- `.github/workflows/*`
- `tooling/*`
- `.codex/*`

이들은 core repository contract를 보조할 뿐, 독립 product authority가 아니다.

## State model

AgentHarness 자체에는 application state machine이 없다.

지속 상태:
- repository files
- Git commit history
- pull request / CI metadata(외부 GitHub state)

명시적 in-process state owner, database transaction, cache, queue는 없다.

## Dependency direction

Repository-level dependency direction:

```text
identity/spec/architecture
        ↓
workflow + task-specific plans
        ↓
implementation/tool configuration
        ↓
verification evidence
```

문서는 implementation을 사실로 만들지 않는다. verification evidence는 실제 실행된 command/result보다 강한 주장을 해서는 안 된다.

## Example application layering

기존 root architecture가 제시한 다음 layer model은 **adopter example**이지 AgentHarness Current implementation이 아니다.

```text
types -> config -> repo -> service -> runtime -> ui
```

이 예시가 사용되는 경우 의미:
- `types`: canonical data shapes
- `config`: runtime-independent configuration
- `repo`: persistence/external adapters
- `service`: domain logic/invariants
- `runtime`: composition/lifecycle/transport
- `ui`: presentation/user interaction

제약 예시:
- UI → repo 직접 의존 금지
- service → UI 의존 금지
- ingress/egress boundary validation

현재 `packages/example-domain/*`는 empty skeleton이므로 이 dependency graph의 runtime enforcement evidence는 없다.

## Persistence / transaction / authority

- persistence: Git repository 자체만 material persistence다.
- transaction: application transaction semantics 없음.
- authority: human controls direction/constraints/final ambiguous judgment; agent executes within repository rules.
- destructive/external action policy: security guidance와 host permission model에 의존한다.

## Concurrency / stale result / cancellation

AgentHarness 자체에는 asynchronous application job identity나 stale-result model이 없다.

CI나 agent host가 병렬 실행을 제공할 수 있으나 repository가 공유 상태에 대한 concurrency protocol을 정의하지 않는다. 동시에 같은 파일을 수정하는 작업은 Git conflict/review discipline에 의존한다.

## Failure and recovery

- script failure: shell exit status가 primary signal.
- verification failure: failed check를 숨기지 않는다.
- unwired verification: success로 취급하지 않는다.
- document drift: current evidence와 canonical docs를 재대조하여 수정한다.
- implementation rollback: Git history가 recovery mechanism이다.

## Extension points

허용되는 확장:
- host-specific skill adapters
- CI provider replacement
- language/package-manager-specific verification
- boundary tooling replacement
- additional product/spec templates

조건:
- core authority를 복제하지 않을 것
- optional extension이 required core처럼 보이지 않을 것
- 실제 wiring이 없는 capability를 REACHABLE로 주장하지 않을 것
