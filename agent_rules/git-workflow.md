# Git Workflow

## Branches & Worktrees

- Code changes happen on task branches in worktrees, never directly on `main` in board home:
  `git worktree add .worktrees/task-{ID}-{slug} -b task/{ID}-{slug}` (from `main`).
- Board home (`main`) stays clean except for `kanban/` board commits.
- After merging a task, optionally clean up: `git worktree remove --force .worktrees/task-{ID}-{slug}` then `git branch -d task/{ID}-{slug}`.

## Commit Style

Follow the repo's existing prefixes (see `git log`):

- `feat:` — new capability · `fix:` — bug fix · `a11y:` / `aeo:` — accessibility / SEO-answerability work
- `chore:` — maintenance · `chore(board): update task #<ID>` — kanban board state
- `merge: task/<ID>-<slug> into main` — merge commits

## Verify Before Merge

From `frontend/`: `pnpm check` → `pnpm lint` → `pnpm build`. All three pass before the branch merges to `main`. After merge, re-run at least `pnpm build` on main.

## Review Before Merge

Beyond the verify loop, run the fresh-context reviewer on a task branch before merging:

- Invoke the `reviewer` subagent (or the `/review` command) on the branch diff, passing the task ID so the card's acceptance criteria are checked.
- The reviewer checks: acceptance criteria met, scope drift, rule violations (`agent_rules/`, `frontend/AGENTS.md`, `frontend/DESIGN.md` for visual changes), and verify evidence.
- The invoking session saves the report to `docs/reviews/<task-id>.md` (see `docs/reviews/README.md`).
- The disposition is advisory: CI remains the hard gate. `fix`/`rework` findings are addressed or explicitly waived before the branch merges.

## Board Commits

`kanban/` is git-tracked. After moving a task to `done`:

```powershell
git add kanban/config.yml kanban/tasks/
git commit -m "chore(board): update task #<ID>"
```

## Hygiene

- Never commit secrets or keys. The Web3Forms access key is client-side by design (public in the bundle) — keep it only in its config location, never in logs or commits.
- Windows PowerShell 5.1: chain with `;` (no `&&`), quote paths with spaces, prefer the tool's `workdir` over `cd`.
- Stage only intended files; never `git add .` blindly (`.worktrees/`, `.impeccable/` scratch are ignored).
