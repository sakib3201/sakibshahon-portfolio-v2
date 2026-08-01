# Agent Harness Evolution — Comparison & Plan

> Research-backed plan for evolving this repo's AI agent harness toward an **orchestrator + reviewer + executor** architecture.
> Current harness: rules (`AGENTS.md` router + `agent_rules/`), skills (`.agents/skills/`, locked), kanban board + worktrees, CI + `/verify` command. **Zero agents defined** — the human is the only orchestrator, review is CI-only.
>
> **Last reviewed:** 2026-08-01 (v1.2 — stages 1–3 implemented; model routing still open)

---

## 1. Current State

| Component | Where | Status |
|---|---|---|
| Context router | `AGENTS.md` (root) + `frontend/AGENTS.md` | Working — lazy rule loading |
| Domain rules | `agent_rules/` (content-truth, site-standards, git-workflow, board-workflow) | Working |
| Skills | `.agents/skills/` (copywriting, impeccable, kanban-based-development, kanban-md, using-git-worktrees) + `skills-lock.json` | Working |
| Board | `kanban/` (git-tracked), claimed tasks, worktree loop | Working |
| Deterministic gate | `.github/workflows/verify.yml` + `/verify` command | Working |
| Orchestrator | Human (the user) | Working at 1-owner scale |
| Reviewer subagent | **None** | Gap — CI catches build errors, not plan drift, rule violations, or quality |
| Executor agents | **None** (main session does everything sequentially) | Gap — no parallel board-task workers |
| Delegation contract | Board cards are free-form | Gap — no objective/acceptance/output fields |

In-repo precedent: `.agents/skills/impeccable/agents/impeccable_finish_reviewer.toml` is a fully-specified reviewer (fresh eyes, read-only, `disposition: rebuild|fix|ship` line, strict output contract) — but it is `.toml` for an external harness and only covers design.

## 2. Research Findings

### 2.1 Anthropic — multi-agent research system (orchestrator-worker)
Source: https://www.anthropic.com/engineering/built-multi-agent-research-system (Jun 2025)

- Lead agent plans, decomposes, delegates, synthesizes; specialist subagents run in parallel with their own context windows.
- **Teach the orchestrator how to delegate**: every subtask needs an objective, an output format, allowed tools, and clear boundaries. Vague delegation produces duplicated or gapped work.
- **Scale effort to complexity**: explicit budgets (1 agent / 3–10 tool calls for simple; 3–5+ parallel subagents for complex) prevent over-spending.
- **Subagents write to the filesystem, not through conversation** — avoids the "game of telephone" (information loss and token bloat from copying outputs through the coordinator).
- Multi-agent systems use ~4× tokens vs. chat, ~15× vs. a single agent run. Coding has **fewer parallelizable units than research**; agents are not yet great at real-time coordination/delegation. Payoff concentrates in breadth-first parallel work.
- Extended thinking improves delegation quality; parallel tool calling cut research time up to 90%.

### 2.2 Claude Code — subagents, verification, writer/reviewer
Sources: https://code.claude.com/docs/en/agents · https://www.anthropic.com/engineering/claude-code-best-practices

- **"The agent doing the work isn't the one grading it."** A verification subagent in a fresh context refutes the result; the reviewer should see only the diff + criteria, not the writer's reasoning, so it evaluates on its own terms.
- **Adversarial review step before done**: review the diff against the plan; report gaps tied to requirements, not style preferences. (Prompted reviewers will always find *something* — instruct them to flag only correctness/requirement gaps.)
- **Writer/Reviewer pattern** (separate sessions): fresh context avoids writer bias.
- Phases: **Explore → Plan → Implement → Commit**; plan mode separates exploration from execution; skip planning only when the change is one-sentence-scoped.
- Worktrees isolate parallel sessions; agent teams (lead + shared task list) and dynamic workflows (scripted multi-subagent runs with cross-checks) exist but are for larger jobs.
- Give the agent a **verification loop it can run itself** (tests/build/screenshot) — closes the loop without the human.

### 2.3 opencode — agents, permissions, task topology
Source: https://opencode.ai/docs/agents/

- **Primary agents** (Tab-switchable) vs **subagents** (`@mention` or Task tool; `mode: subagent`).
- Per-agent config: `model` (routing), `temperature`, `steps` (max iterations), `permission` (edit/bash/etc.), `hidden` (invokable only programmatically), `color`.
- **`permission.task` globs** control which subagents an agent may spawn — e.g. orchestrator with `"*": "deny", "executor": "allow", "reviewer": "allow"`. Last matching rule wins.
- Agents live as markdown in `.opencode/agents/*.md` (filename = agent name) or JSON under `agent` in `opencode.json`.
- Built-ins: `plan` (read-only primary), `explore`/`scout` (read-only subagents), `general` (full-tools subagent) — usable as building blocks.
- Commands (`opencode.json` → `commands`) can package a workflow, e.g. `/review`.

## 3. Comparison — This Repo vs. Best Practice

| Best-practice component | This repo | Gap / action |
|---|---|---|
| Deterministic verify gate | CI + `/verify` (check/lint/build) | None — keep as the hard gate |
| Context rules, lazy-loaded | `AGENTS.md` router + `agent_rules/` | None — reviewer must *load* rules (`site-standards`, `content-truth`) |
| Domain skills | 5 skills, locked | None — reviewer may invoke `impeccable` for design passes |
| Board + worktree isolation | kanban claims + worktrees | None — executor infra ready |
| Delegation contract | free-form cards | Add Objective / Acceptance criteria / Output format to card template |
| Fresh-context adversarial review | none (CI only) | **Add reviewer subagent + pre-merge gate** |
| Parallel executor workers | none | Add executor subagent for parallel board tasks |
| Dedicated orchestrator | human | Optional stage 3 — opencode `permission.task` topology |

## 4. Recommendations — Three Stages

### Stage 1 — Reviewer subagent (highest leverage, do first)
- `.opencode/agents/reviewer.md`: read-only (`edit: deny`, bash restricted to verify commands), fresh context, loads `site-standards.md` + `content-truth.md` (+ `frontend/AGENTS.md`), reviews the diff against the task's acceptance criteria and the repo rules, runs the verify loop, returns ordered gaps with a disposition line (`disposition: pass | fix | rework`), modeled on the impeccable finish reviewer's output contract.
- `opencode.json`: add `review` command — runs the reviewer on the current diff (acceptance criteria passed as argument).
- `agent_rules/git-workflow.md`: mandatory reviewer pass before merge, in addition to the verify loop.
- Reviewer writes its report to `docs/reviews/` (filesystem artifact — §2.1 "game of telephone" lesson).

### Stage 2 — Executor subagent + delegation contract
- `.opencode/agents/executor.md`: worktree-bound worker — claims an already-claimed board task, creates/enters its worktree, implements, runs verify loop, commits on the task branch; reports back with commit hash + verify evidence.
- `agent_rules/board-workflow.md`: card template gains **Objective / Acceptance criteria / Output format / Done** (verify loop + reviewer disposition `pass`). Enables any executor to pick up any card.
- Use executors only when ≥2 board tasks are parallelizable — sequential single-task work stays in the main session (Anthropic's cost warning).

### Stage 3 — Dedicated orchestrator (optional, only when parallel work is routine)
- Primary agent `orchestrator` (Tab-switchable) with `permission.task: {"*": "deny", "executor": "allow", "reviewer": "ask"}`.
- Model routing: reviewer on the strongest model (it is the last gate), executor on the default/cheaper model (mechanical work).
- Research nuance: at 1-owner scale the human is usually the better orchestrator; this stage is for when multiple board tasks run per day.

### Explicitly out of scope (skip list)
- Agent teams / dynamic workflows (Claude Code): overkill + token-profligate for this repo.
- Headless/CI agents: CI already covers the deterministic gate.
- Any change to `.claude/`: no longer used (see harness history).

## 5. Design Sketches

### `reviewer` (Stage 1)

```markdown
---
description: Reviews a diff against the task's acceptance criteria and repo rules;
  read-only; returns a disposition line and ordered gaps
mode: subagent
permission:
  edit: deny
  bash:
    "*": ask
    "pnpm *": allow
    "git diff*": allow
    "git status*": allow
    "git log*": allow
---
You are the fresh-context reviewer. You never edit.
Load @agent_rules/site-standards.md and @agent_rules/content-truth.md (and
frontend/AGENTS.md when the diff touches frontend/). Review the diff only —
not the reasoning behind it. Check: acceptance criteria met, plan drift,
rule violations, verify-loop health. Flag correctness/requirement gaps only,
not style.
Return, in order: a `disposition:` line (pass | fix | rework), an ordered
gaps list (each one line, tied to a criterion or rule), and an evidence
line (verify commands run + results). Write the report to docs/reviews/<task-id>.md.
```

### `executor` (Stage 2)

```markdown
---
description: Executes one claimed board task in its worktree; verifies and commits
mode: subagent
permission:
  edit: allow
  bash: allow
---
You are a worktree executor. Take the task card (ID, objective, acceptance
criteria, output format), enter/create its worktree, implement, run the
verify loop from frontend/, commit on the task branch, and report commit
hash + verify evidence. Never touch another agent's worktree or claim.
```

## 6. Decision Record

| # | Question | Status |
|---|---|---|
| 1 | Recreate `.opencode/agents/` (removed in harness cleanup) for agent files? | **Answered** — yes; markdown agents at `.opencode/agents/reviewer.md` + `.opencode/agents/executor.md` |
| 2 | Reviewer disposition as a hard merge gate, or advisory after CI? | **Answered** — advisory in-session; CI remains the hard gate |
| 3 | Model routing: which provider/models for reviewer vs executor? | Open — no per-agent `model` overrides set yet; add per-agent once provider setup is decided |
| 4 | Where do review artifacts live? | **Answered** — `docs/reviews/<task-id>.md`, written by the invoking session (reviewer is read-only) |
| 5 | Board card template change — apply retroactively to open cards? | **Answered** — new cards only |

## 7. Implementation Checklist

- [x] (done) Stage 1: write `.opencode/agents/reviewer.md`
- [x] (done) Stage 1: add `review` command to `opencode.json`
- [x] (done) Stage 1: add reviewer gate to `agent_rules/git-workflow.md`
- [x] (done) Stage 1: create `docs/reviews/` artifact convention
- [x] (done) Stage 2: write `.opencode/agents/executor.md`
- [x] (done) Stage 2: update `agent_rules/board-workflow.md` card template (delegation contract section)
- [x] (done) Stage 3: `orchestrator` primary agent + task-permission topology (`.opencode/agents/orchestrator.md`, `permission.task: {"*": "deny", "executor": "allow", "reviewer": "ask"}`)
- [x] (done) Update `README.md` harness section (agents, `/review`) + this doc's status
