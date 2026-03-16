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
