# QUALITY_SCORE.md

Use this file to track quality gaps over time.

## Scoring rubric

- A: stable, tested, documented, observable
- B: mostly stable, some gaps remain
- C: usable but inconsistent or under-tested
- D: fragile, risky, or under-specified

## Domains

| Domain | Score | Notes | Next action |
|---|---|---|---|
| Core domain | C | Missing integration tests | Add targeted scenario tests |
| Runtime | B | Logs exist, traces partial | Add startup trace checks |
| UI | C | Empty states inconsistent | Standardize fallback states |
| Docs | C | Some plans stale | Run docs gardening |
