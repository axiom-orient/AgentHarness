# PRODUCT_SENSE.md

## Purpose

This document describes the product intent agents should preserve during implementation.

## Core principles

- prefer clarity over cleverness
- minimize user effort
- preserve trust through predictable behavior
- default to reversible changes
- optimize for the main user journey before edge cases

## User-facing change rubric

When changing behavior, evaluate:

1. does this reduce friction for the primary task?
2. does this preserve or improve comprehensibility?
3. does this avoid surprising behavior?
4. is failure visible and recoverable?
5. is the change explainable in one short paragraph?

## Anti-patterns

- hidden state changes
- silent destructive actions
- unclear empty states
- premature complexity
- configuration that exists only for developer convenience
