# Board Workflow (kanban-md)

Full workflow and non-negotiables live in the **kanban-based-development** skill (`.agents/skills/kanban-based-development/SKILL.md`) — load it before board work. Summary:

- **Board home** = this repo root. Run all `kanban-md` commands here; the board directory is git-tracked.
- **Identity:** `kanban-md agent-name` → use the result as `--claim <name>` for the whole session.
- **Claim before any work:** `kanban-md pick --claim <agent> --status todo --move in-progress` (fall back to `backlog` if `todo` is empty). One active task per agent. Never steal or release another agent's claim.
- **Code in worktrees:** `git worktree add .worktrees/task-{ID}-{slug} -b task/{ID}-{slug}`.
- **Progress notes:** `kanban-md edit <ID> --append-body "…" --timestamp --claim <agent>`.
- **Finish:** merge from board home → `kanban-md edit <ID> --release` → `kanban-md move <ID> done` → commit board changes (see `agent_rules/git-workflow.md`).
- **Defer to the user** (park in `review` via `kanban-md handoff <ID> --block "…" --note "…" --timestamp --release`) for: product decisions, credentials/access, external actions (push, deploy, ENV), or judgment-required conflicts.
- If `pick` finds nothing and everything is waiting on the user, ask targeted questions and stop — don't thrash the board.

## Delegation Contract (new cards only)

Cards created for agent execution carry these fields so any executor can pick them up:

- **Objective** — one sentence: what the task is for.
- **Acceptance criteria** — checkable statements the reviewer verifies against the diff.
- **Output format** — what "done" looks like (files touched, artifacts produced).
- **Done** — the fixed checklist: verify loop passes, reviewer disposition `pass` (or findings waived), merged to `main`.

Worker subagents: `executor` (worktree executor) and `reviewer` (fresh-context, read-only) — defined in `.opencode/agents/`. Executors never claim, merge, or move cards; the parent does.
