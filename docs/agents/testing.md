<!-- doc-meta
type: reference
created: 2026-09-10
last-verified: 2026-09-10
shelf-life: durable
-->

# Testing — the auto-test contract, run commands, evidence tiers

What "tested" means in THIS repo. Planner, implementer, tester and reviewer all read this
file.

**Project shape:** a static climbing web page — HTML, CSS and light JavaScript, no
application framework. No build step, no test runner and no CI are established yet: the
repo is currently empty.

## The contract (every lane, every change)

Every change ships with automated coverage. Pick the surface(s) that actually pin the
change:

| Change area | Coverage surface |
|---|---|
| Page markup and structure | **none yet — propose per plan.** Likely an HTML validity check plus an accessibility scan over the built pages. |
| Styling and layout | **none yet — propose per plan.** Visual regression is usually not worth it early; prefer asserting layout-critical behaviour in a browser test over screenshot diffing. |
| Client-side JavaScript behaviour | **none yet — propose per plan.** A unit runner only once there is logic worth isolating; a browser-driven test otherwise. |
| Navigation and links between pages | **none yet — propose per plan.** Link validation over the built site catches the common breakage. |
| Content and copy | Generally not automatable. Review by eye and say so in the plan. |

**No suite exists, so the first plan that touches a surface proposes its coverage** — the
tool, the command, and what it asserts — and the user approves it before the implementer
writes anything. Once a surface lands, replace its row here with the real command and bump
`last-verified`.

**Skipping requires all three:** (1) a genuine attempt to design an automatable approach,
(2) that proposal — or the concrete reasons automation is impossible or prohibitive —
presented to the user, (3) the user's explicit approval, recorded in the plan doc. Never
silently skip. Never silently add either — test work is planned and reviewed like any
other change.

For a static site, "automation is prohibitive" is a claim that needs defending: a page that
renders, has valid markup, is reachable by its links and passes an accessibility scan is
cheap to assert. Reach for that before proposing a skip.

## Evidence tiers (what counts as proof of "done"/"passing")

### Current commands  <!-- dated: 2026-09-10 -->

- **Targeted run:** not established yet. Re-establish by reading the scripts in the
  project manifest (`package.json` or equivalent) once one exists.
- **Build:** not established yet. A no-build static site counts as built when the pages
  open from the filesystem or a local static server.
- **Expensive territory:** nothing identified yet.

Until a command exists, a session must NOT claim tests pass. It states plainly that the
repo has no automated coverage for the change and names what it proposed instead.

Once a suite lands: iterate on failures until green, then one full targeted pass to
confirm. **"Pass" = no NEW failures** vs the known-red baseline below.

## Known-red baseline  <!-- dated: 2026-09-10 -->

Failures that pre-date your change (keep current; empty = everything expected green):

- _none recorded — no suite exists yet_

## Rules that never bend

- **Fail-first.** Every new test is seen to fail for the right reason before it passes.
- **Goldens/fixtures are reviewed artifacts** — never regenerated unprompted; surface
  diffs, don't bless them.
- **Never relax a verifier or widen an ignore-list to make a test pass** — root-cause at
  the source. Silent data loss is a P0.
- **Never claim a page works because the code looks right.** Open it, or drive it with a
  browser tool, and say which you did.
- No services, containers or environment setup are needed to run anything today. If that
  changes, record here what must be running and who starts it: when the agent cannot start
  it, it prepares everything and names what the user must start.
