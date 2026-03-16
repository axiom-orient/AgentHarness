# ARCHITECTURE.md

## Goal

The architecture should remain legible to both humans and code agents.
The primary design objective is **predictable change** under automated assistance.

## Layer model

Each business domain follows this dependency direction:

`types -> config -> repo -> service -> runtime -> ui`

### Layer definitions

#### `types`
- shared data shapes
- value objects
- schemas and canonical type definitions

#### `config`
- environment mapping
- feature flags
- runtime-independent configuration

#### `repo`
- persistence adapters
- external API adapters
- storage primitives

#### `service`
- business logic
- orchestration inside the domain
- invariant enforcement

#### `runtime`
- app wiring
- lifecycle hooks
- transport and process concerns

#### `ui`
- rendering
- presentation state
- user interaction only

## Cross-cutting concerns

Cross-cutting concerns must enter through explicit provider interfaces only.
Examples:

- auth
- telemetry
- connectors
- feature flags
- caching

No ad hoc lateral imports.

## Architectural invariants

- UI must not import repo directly.
- Service must not import UI.
- Boundary validation must happen at ingress and egress.
- Domain rules belong in service, not transport or persistence layers.
- Shared utilities must be generic and small.
- Business logic must not hide inside scripts.

## Preferred implementation style

- small modules
- explicit names
- deterministic behavior
- typed boundaries
- narrow interfaces
- stable helper reuse

## Escalation-required changes

Require a plan update and explicit review before changing:

- layer direction
- public contracts
- schema shape
- concurrency model
- auth model
- billing logic
- retry and idempotency behavior
