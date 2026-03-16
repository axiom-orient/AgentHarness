---
name: implementation-strategy
description: Use before non-trivial changes. Produces a concrete implementation approach, highlights architectural boundaries, and identifies migration risk.
---

## Procedure

1. Read the relevant spec and architecture docs.
2. Identify the affected layers.
3. Name invariants that must remain true.
4. Compare at least two implementation approaches.
5. Choose the simpler viable option.
6. Write or update the execution plan.

## Evaluation criteria

- simplicity
- boundary compliance
- reversibility
- testability
- observability
