# AGENTS.md

## Purpose

This repository is optimized for **agent-first development**.
Human operators steer direction, constraints, acceptance criteria, and final judgment.
Agents are expected to execute implementation, verification, documentation sync, and repetitive maintenance tasks.

## First read order

1. `ARCHITECTURE.md`
2. `PRODUCT_SENSE.md`
3. `WORKFLOW.md`
4. the relevant spec under `docs/product-specs/`
5. the relevant execution plan under `docs/exec-plans/active/`

## Mandatory rules

- Keep this file short. Durable knowledge belongs in `docs/`.
- For non-trivial work, create or update an execution plan before editing code.
- If behavior changes, update tests and docs in the same change.
- Do not directly edit generated artifacts unless you also update the generating source.
- Prefer shared utilities over one-off helpers.
- Do not guess data shapes. Validate at boundaries or use typed SDKs.
- Escalate before changing auth, billing, security, concurrency, schema, or public API behavior.

## Required checks before review

Run the smallest relevant verification set:

- format
- lint
- typecheck
- targeted tests
- docs sync check if behavior or architecture changed

Use the `code-change-verification` skill where available.

## Review posture

Review for:

- correctness
- boundary compliance
- test evidence
- docs/spec sync
- simplicity
- reversibility

## Escalation conditions

Stop and update the plan before proceeding if any of these change:

- domain model
- API contract
- state transition logic
- dependency direction
- operational envelope
