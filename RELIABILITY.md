# RELIABILITY.md

이 문서는 adopter가 사용할 수 있는 **optional reliability guidance**다. AgentHarness 자체의 runtime reliability나 현재 구현 상태를 설명하지 않는다.

Canonical requirements와 Current 상태는 다음이 소유한다.

- [`docs/SPEC.md`](docs/SPEC.md)
- [`docs/ARCHITECTURE.md`](docs/ARCHITECTURE.md)
- [`docs/IMPLEMENTATION_STATUS.md`](docs/IMPLEMENTATION_STATUS.md)

Adopted product에서 reliability target을 정의할 때는 측정 가능한 critical-path 목표, 실제 retry/idempotency semantics, observable start/success/failure/retry evidence를 해당 제품의 specification과 implementation evidence에 연결해야 한다.
