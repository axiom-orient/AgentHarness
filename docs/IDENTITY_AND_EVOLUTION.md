# IDENTITY_AND_EVOLUTION

## 정체성

AgentHarness는 **agent-first software repository를 위한 최소 운영 template set**이다.

목적은 agent runtime을 만드는 것이 아니라, 인간과 코드 agent가 같은 repository에서 변경을 수행할 때 필요한 **규칙, 지속 지식, 계획, 검증 entry, review evidence, architecture boundary**를 짧고 명시적인 artifact로 제공하는 것이다.

주요 사용자/caller:
- 제품 방향·제약·수용 기준을 정하는 인간
- 구현·검증·문서 동기화·반복 유지보수를 수행하는 code agent
- repository CI와 local shell tooling

핵심 문제:
- agent가 repository context를 매번 추측하는 문제
- 계획·구현·검증·문서가 분리되어 drift하는 문제
- 변경 완료의 근거가 대화에만 남고 repository에 남지 않는 문제
- architecture boundary가 문서에만 있고 실행 경로와 분리되는 문제

핵심 가치:
- 최소한의 first-read context
- durable repository knowledge
- explicit execution intent
- observable verification evidence
- predictable, reviewable change

책임 범위:
- repository-level agent instructions
- durable design/product/spec templates
- execution-plan convention
- verification/test/app shell entry templates
- reusable agent skill templates
- CI/boundary-enforcement examples

비목표:
- 범용 agent orchestrator/runtime
- model routing 또는 provider abstraction
- application state machine
- database/network/service framework
- 특정 언어·package manager·agent vendor에 대한 강제 ABI

## 변하면 안 되는 것

- 인간이 방향·제약·수용 기준·최종 판단을 소유하고 agent가 실행을 보조한다는 authority 분리.
- repository가 지속 지식과 변경 근거의 canonical storage라는 원칙.
- non-trivial change는 실행 의도와 검증 범위를 명시해야 한다는 원칙.
- behavior/public contract/schema/concurrency/security 등 material semantics의 변경은 명시적 검토 대상이어야 한다는 원칙.
- verification success는 실제 실행된 검증만 의미해야 하며 placeholder나 문서 선언으로 대체되면 안 된다.
- template은 adopter의 실제 기술 스택보다 상위의 규칙을 제공해야 하며, 특정 예시 구현을 필수 architecture로 오인시키면 안 된다.

## 변경 가능한 것

다음은 위 불변조건을 보존하는 한 교체·축소·확장 가능하다.

- agent host(Codex 등)와 skill discovery 형식
- programming language, package manager, build system
- local verification command와 CI provider
- dependency-boundary 도구
- documentation layout과 template 표현
- example domain layering
- plan/spec template의 세부 field
- metrics와 quality rubric

변경 조건:
- owner와 authority가 중복되지 않을 것
- Current fact와 normative target을 같은 문서에서 혼동하지 않을 것
- placeholder는 observable success로 위장하지 않을 것
- adopter가 필요한 부분만 선택할 수 있도록 optional capability와 required core를 구분할 것

## 발전 방향

AgentHarness는 기능을 많이 추가하는 방향보다 **repository change protocol을 더 작고 정확하게 만드는 방향**으로 발전해야 한다.

우선 판단 기준:
1. agent가 적은 context로 올바른 authority를 찾을 수 있는가
2. request → plan → change → verification → evidence가 repository 안에서 추적 가능한가
3. 검증과 CI의 성공 의미가 실제 수행된 작업과 일치하는가
4. 특정 vendor/tool에 종속되지 않고도 같은 completion semantics를 유지하는가
5. 새로운 문서나 layer 없이 기존 authority를 더 명확하게 만들 수 있는가

코어는 다음 네 가지로 제한하는 것이 적절하다.

```text
Repository contract
+ durable intent/spec
+ execution/verification entry
+ reviewable evidence
```

skills, CI, dependency tools, metrics, language-specific examples는 이 코어를 강화하는 선택 기능이어야 하며 별도의 authority를 만들면 안 된다.
