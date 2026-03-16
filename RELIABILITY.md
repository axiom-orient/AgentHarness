# RELIABILITY.md

## Reliability goals

Replace vague claims with measurable targets.

Examples:

- app startup completes within 800ms in local benchmark mode
- no critical user journey span exceeds 2s at p95 in test environment
- retries are bounded and idempotent where required

## Operational rules

- define SLO-like targets for critical paths
- log structured events for start, success, failure, and retry
- preserve reproducible bug scenarios
- prefer deterministic tests over brittle timing assumptions
