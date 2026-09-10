<!-- doc-meta
type: reference
created: 2026-09-10
last-verified: 2026-09-10
shelf-life: durable
-->

# Domain Docs

How the engineering skills should consume this repo's domain documentation when exploring
the codebase.

**Layout: single-context.** One `CONTEXT.md` and one `docs/adr/` at the repo root. There is
no `CONTEXT-MAP.md` and no per-context glossary.

## Before exploring, read these

- **`CONTEXT.md`** at the repo root — the glossary of climbing-domain and site terms.
- **`docs/adr/`** — read the architecture decision records that touch the area you are
  about to work in.

If these files don't exist, **proceed silently**. Don't flag their absence; don't suggest
creating them upfront. The `/domain-modeling` skill (reached via `/grill-with-docs`)
creates them lazily when terms or decisions actually get resolved. Both are absent today:
the repo is empty.

## File structure

```
/
├── CONTEXT.md
├── docs/adr/
│   ├── 0001-<decision>.md
│   └── 0002-<decision>.md
└── ...site sources
```

## Use the glossary's vocabulary

When your output names a domain concept (in a ticket title, a refactor proposal, a
hypothesis, a test name), use the term as defined in `CONTEXT.md`. Don't drift to synonyms
the glossary explicitly avoids.

If the concept you need isn't in the glossary yet, that's a signal — either you're
inventing language the project doesn't use (reconsider) or there's a real gap (note it for
`/domain-modeling`).

## Flag ADR conflicts

If your output contradicts an existing ADR, surface it explicitly rather than silently
overriding:

> _Contradicts ADR-0007 (static pages, no client-side router) — but worth reopening because…_
