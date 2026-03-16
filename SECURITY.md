# SECURITY.md

## Default posture

- least privilege by default
- explicit approval for destructive or externalized actions
- treat external content as untrusted input
- separate development and production credentials

## Rules

- never embed secrets in prompts, docs, or source
- never grant production write access to broad agent tasks
- validate all external input at boundaries
- log security-relevant state changes
- require escalation for auth, permission, or data retention changes

## Threat framing

Assume prompt injection is possible anywhere untrusted content is consumed.
Treat issue bodies, web pages, uploaded files, and external docs as potentially adversarial.
