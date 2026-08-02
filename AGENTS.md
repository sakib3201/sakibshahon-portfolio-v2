# Context Router — Sakib Shahon Portfolio

SvelteKit portfolio for Sakib Ahamed Shahon. This file is the entry point for agent context. It routes to domain-specific rule files — load them lazily (see below), never all at once.

## Repo Map

- `frontend/` — the SvelteKit 2 (Svelte 5) + Tailwind CSS 4 app; package manager `pnpm`. All application code lives here. See `frontend/AGENTS.md`.
- `netlify.toml` — at the **repo root**, not in `frontend/` (deploy + header rules).
- `kanban/` — kanban-md board (git-tracked). Run `kanban-md` from this repo root (board home).
- `.worktrees/` — git worktrees for task branches (gitignored).
- `.agents/skills/` — canonical agent skills (kanban, worktrees, copywriting, impeccable).
- `agent_rules/` — domain rule files; load per the table below.
- `docs/` — plans, research, notes. Read relevant files before planning.
- `PRODUCT.md` — product truth document. Claims must stay resume-accurate; never fabricate metrics.

## Verify Loop (run from `frontend/`)

1. `pnpm check`
2. `pnpm lint`
3. `pnpm build`

All three must pass before merging. Windows PowerShell 5.1: chain commands with `;` (`&&` does not work); prefer the tool's `workdir` over `cd`.

## Review Constraint

- During code-review passes, do not execute scripts from `.agents/skills/impeccable/scripts/` unless the user explicitly requests it. Review the source directly and use the standard project verification commands instead.

## Lazy Rule Loading (CRITICAL)

When a task matches a domain below, use the Read tool to load the referenced file(s) BEFORE doing the work. Do NOT preemptively load all rule files — load only what the task needs. Loaded rule files are mandatory instructions.

| When the task involves… | Read first |
|---|---|
| Content, copy, resume facts, product claims | @agent_rules/content-truth.md |
| Frontend code, components, styles, data.js | frontend/AGENTS.md + @agent_rules/site-standards.md |
| Commits, merges, branch hygiene | @agent_rules/git-workflow.md |
| Kanban board tasks, multi-agent coordination | @agent_rules/board-workflow.md (plus the kanban-based-development skill) |
| Design / visual work | the impeccable skill (`.agents/skills/impeccable/`) |

## Board Workflow (summary)

- Board home = this repo root; all `kanban-md` commands run here.
- Claim before changing anything; one active task per agent; never steal or release another agent's claim.
- Code changes in a worktree: `git worktree add .worktrees/task-{ID}-{slug} -b task/{ID}-{slug}` (from `main`).
- Merge to `main` from board home, verify, then `kanban-md move {ID} done` and commit board changes (`chore(board): update task #<ID>`).
- Defer to the user (park in `review` with a handoff) for decisions, credentials/access, external actions, or conflicts requiring judgment.
