# Review Artifacts

One file per reviewer pass: `docs/reviews/<task-id>.md` (use `unpinned.md` for reviews without a task ID).

## Format

The reviewer subagent's output contract — a `disposition:` line, a `gaps` list, and `evidence` — plus a one-line header naming the commit or diff reviewed.

## Conventions

- Written by the invoking session, not by the reviewer (the reviewer is read-only).
- Reference the commit or diff reviewed at the top of the file.
- Keep resolved and waived findings in the file — the history is the point.
- A `fix` or `rework` disposition should be resolved (or explicitly waived) before the branch merges; see `agent_rules/git-workflow.md`.
