# ClimbingWebPage

A static climbing web page. HTML, CSS and light JavaScript, no application framework.

## Agent skills

### Issue tracker

Work is tracked in the in-repo backlog: `backlog/T-###-<slug>.md` with a `backlog/TICKETS.md`
index, and each ticket's plan and reports under `backlog/T-###/`. Code host is GitHub
(`hyzajabada/ClimbingWebPage`), default branch `main`; a push is verified with
`gh pr view --json url,title,isDraft,baseRefName`. See `docs/agents/issue-tracker.md`.

### Domain docs

Single-context: `CONTEXT.md` and `docs/adr/` at the repo root. Neither exists yet; they are
created lazily by `/domain-modeling`. See `docs/agents/domain.md`.

### Plan documents

Phased plan docs live at `backlog/T-###/plan.md`, beside the ticket.

### Testing

Static web page with no test runner established yet. Every surface is "none yet — propose
per plan": the first plan touching a surface proposes its tool, command and assertions for
approval. Until a command exists, no session claims tests pass. See `docs/agents/testing.md`.

### Language

The site's audience is Polish. Written artifacts follow a split:

- **Polish** — backlog tickets, plan docs, reports, ADRs, `CONTEXT.md`, and all page copy.
  The user reads and approves these.
- **English** — code identifiers, file names, branch names, and commit messages.

The domain glossary records Polish climbing terms as the canonical vocabulary. When an
English term is the one actually used in the trade, record both and say which one the page
copy uses.

Interviews and reporting to the user run in Polish. Agent dispatch prompts and reports may
be written in Polish; do not translate a user-approved decision into English on the way
into a plan.
