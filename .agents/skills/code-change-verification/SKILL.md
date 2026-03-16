---
name: code-change-verification
description: Use after code or build changes. Runs the smallest relevant verification set and summarizes failures by root cause.
---

## When to use

- files changed under source, tests, config, or build tooling
- before opening or updating a PR
- after applying review feedback

## Procedure

1. Detect changed files.
2. Decide the smallest relevant checks.
3. Run `scripts/verify.sh`.
4. Group failures by root cause.
5. Report next actions clearly.

## Constraints

- do not patch generated outputs directly
- do not report raw logs without interpretation
- note any missing test coverage
