# IMPLEMENTATION_STATUS

## 제품 / caller / value / 범위

AgentHarness는 실행형 AI agent runtime이 아니라 **agent-first software repository를 시작하고 운영하기 위한 template set**이다.

주요 caller:
- repository를 구성하는 인간
- repository instruction과 skill을 읽는 code agent
- GitHub Actions / local shell tooling

핵심 value:
- agent 작업 규칙을 짧게 유지
- durable knowledge를 repository 안에 둠
- 비단순 작업을 execution plan으로 명시
- verification/docs sync/bug repro/PR summary를 반복 가능한 skill과 script entry로 만듦
- architecture boundary와 review discipline을 adoption template으로 제공

실제 application domain/runtime/UI/database/provider는 범위에 포함되지 않는다.

## 분석 단위

- [`ANALYSIS.md`](./ANALYSIS.md) — repository 전체 material boundary, execution path, owner, findings, gap의 상세 근거.

독립 실행 제품이나 별도 material subproject는 현재 없다. `packages/example-domain/*`는 empty example skeleton이다.

## 실제 통합 구조

```text
Human intent
   │
   ├─> AGENTS.md ─────────────┐
   ├─> WORKFLOW.md            │
   ├─> docs/* templates       │  repository conventions
   └─> .agents/skills/* ──────┘

Git push / PR
   └─> .github/workflows/verify.yml
        └─> scripts/verify.sh
             └─> TODO output only (current)

Adopter source graph
   └─> tooling/{dependency-cruiser, eslint-boundaries} examples
        └─> no current invocation wiring
```

## Owner

| Concern | Current owner | 상태 |
|---|---|---|
| Agent repo rules | `AGENTS.md` | 명시적 문서 owner |
| Task lifecycle | `WORKFLOW.md` | 명시적 문서 owner |
| Product/design intent templates | `docs/design-docs/*`, `docs/product-specs/*` | template only |
| Non-trivial execution planning | `docs/exec-plans/*` | template only |
| Verification entry | `scripts/verify.sh` | REACHABLE, 실제 검증 UNWIRED |
| Test entry | `scripts/run-tests.sh` | REACHABLE file, 실제 tests UNWIRED |
| App entry | `scripts/run-app.sh` | REACHABLE file, 실제 app ABSENT |
| CI wrapper | `.github/workflows/verify.yml` | REACHABLE |
| Dependency policy example | `tooling/*` | PUBLIC_LIBRARY / UNWIRED |
| Application state | 없음 | ABSENT_IN_SCOPE |
| Persistence/network/provider | 없음 | ABSENT_IN_SCOPE |

## 기능 요약

| 기능 | 연결 상태 | 계약 충족 상태 | 검증·적용 범위 | 근거 |
|---|---|---|---|---|
| Agent repository guidance | PUBLIC_LIBRARY | SATISFIED | 문서 surface 확인 | `AGENTS.md` |
| Human/agent workflow | PUBLIC_LIBRARY | SATISFIED | 문서 surface 확인 | `WORKFLOW.md` |
| Execution plan template | PUBLIC_LIBRARY | SATISFIED | template 존재 | `docs/exec-plans/active/PLAN_TEMPLATE.md` |
| Product/design templates | PUBLIC_LIBRARY | SATISFIED | template 존재 | `docs/product-specs/*`, `docs/design-docs/*` |
| Agent skills | PUBLIC_LIBRARY | PARTIAL | text surface 확인; 실제 host qualification 미실행 | `.agents/skills/*` |
| Verification workflow | REACHABLE | PARTIAL | workflow→script wiring 확인, 검증 command는 없음 | `.github/workflows/verify.yml`, `scripts/verify.sh` |
| Local app execution | UNWIRED | NOT_IMPLEMENTED | NOT_RUN; placeholder | `scripts/run-app.sh` |
| Test execution | UNWIRED | NOT_IMPLEMENTED | NOT_RUN; placeholder | `scripts/run-tests.sh` |
| Dependency enforcement | UNWIRED | PARTIAL | config example만 존재 | `tooling/*` |
| Application domain/runtime/UI | ABSENT_IN_SCOPE | NOT_IMPLEMENTED | N/A | empty `packages/example-domain/*` |

## 통합 gap

1. **Verification truth gap:** CI success가 actual format/lint/type/test success를 의미하지 않는다.
2. **Authority gap:** root architecture/product/reliability/quality 문서가 template 규범과 repository Current를 혼합한다.
3. **False-current gap:** `QUALITY_SCORE.md`가 존재하지 않는 runtime/test/UI 상태를 Current처럼 기술한다.
4. **Agent portability gap:** skills와 workflow의 실행/완료 의미가 host convention에 의존하며 qualification evidence가 없다.
5. **Adoption contract gap:** 어떤 파일을 반드시 customize해야 template이 유효한 repository가 되는지 README에는 순서가 있으나 machine-verifiable acceptance contract는 없다.

## 검증

- repository tree: PASS (structure/path inspection)
- primary document surfaces: PASS (content inspection)
- CI→verification script wiring: PASS
- actual formatter/lint/typecheck/test: N/A / NOT_RUN — command가 구현되지 않음
- application startup: N/A / NOT_RUN — application이 없음
- dependency boundary enforcement: NOT_RUN — manifest/invocation wiring 없음
- skill auto-discovery/selection: UNKNOWN — external agent host runtime에 의존

## UNKNOWN

- 외부 소비자가 root legacy document path를 참조하는지 여부
- skills의 host별 discovery/selection/completion 성능
- GitHub Actions run history와 실제 production adoption 사례
- template을 복제한 downstream repositories에서 어떤 계약이 사실상 public compatibility surface로 사용되는지
