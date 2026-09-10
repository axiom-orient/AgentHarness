# AGENTS.md

## Purpose

This repository is optimized for **agent-first development**.
Human operators own direction, constraints, acceptance criteria, and final judgment on ambiguous trade-offs.
Agents execute implementation, verification, documentation sync, and repetitive maintenance within repository rules.

## First read order

1. `docs/IDENTITY_AND_EVOLUTION.md`
2. `docs/SPEC.md`
3. `docs/ARCHITECTURE.md`
4. `docs/IMPLEMENTATION_STATUS.md`
5. `WORKFLOW.md`
6. the relevant spec under `docs/product-specs/`
7. the relevant execution plan under `docs/exec-plans/active/`

Use `docs/ANALYSIS.md` when Current evidence or repository-level findings are needed. `docs/PLAN.md` owns unresolved implementation/documentation/verification gaps.

## Mandatory rules

- Keep this file short. Durable knowledge belongs in canonical docs.
- For non-trivial work, create or update an execution plan before editing code.
- If behavior changes, update tests and docs in the same change.
- Do not directly edit generated artifacts unless you also update the generating source.
- Do not guess data shapes. Validate at boundaries or use typed SDKs.
- Prefer the smallest abstraction that has more than one real consumer.
- Never treat placeholder verification as completed verification.
- Escalate before changing auth, billing, security, concurrency, schema, retry/idempotency semantics, or intentional public API behavior.

## Required checks before review

Run the smallest relevant verification set actually wired by the adopted project:

- format
- lint
- typecheck
- targeted tests
- docs sync check if behavior or architecture changed

If a required check is not wired or cannot run, report `NOT_RUN` and the reason rather than passing it implicitly.

Use the `code-change-verification` skill where available.

## Review posture

Review for:

- correctness
- boundary compliance
- test evidence
- docs/spec sync
- simplicity
- reversibility
- Current/target separation

## Escalation conditions

Stop and update the plan before proceeding if any of these change:

- product/domain meaning
- public API or schema contract
- state transition or concurrency semantics
- dependency direction
- security/permission model
- operational envelope
- retry, idempotency, or destructive-action behavior
