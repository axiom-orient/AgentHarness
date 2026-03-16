# Agent-First Repository Template Set

This template set is for running an **agent-first software project** with a minimal but disciplined operating model.

It includes:

- short repo-level guidance for agents
- durable design and product documents inside the repository
- executable plan templates for non-trivial work
- reusable skills for verification, docs sync, bug reproduction, implementation strategy, and PR drafting
- verification scripts and CI examples
- dependency boundary enforcement templates
- cleanup and docs gardening automation examples
- a Korean summary file for explaining the theory to other people

## Recommended adoption order

1. Read `THEORY_SUMMARY_KO.md`
2. Customize `AGENTS.md`
3. Customize `ARCHITECTURE.md` and `PRODUCT_SENSE.md`
4. Wire `scripts/verify.sh` to your real package manager and test commands
5. Enable one boundary tool: `tooling/depcruise.config.cjs` or `tooling/eslint.boundaries.config.mjs`
6. Start using `docs/exec-plans/active/PLAN_TEMPLATE.md` for any non-trivial task
7. Add the `.agents/skills/` folder to your agent workflow
8. Enable the GitHub workflows selectively

## Important defaults

- Keep `AGENTS.md` short.
- Put durable knowledge in `docs/`.
- Treat plans as versioned artifacts.
- Promote repeated review comments into tooling or skills.
- Run cleanup continuously, not as a weekly manual ritual.
