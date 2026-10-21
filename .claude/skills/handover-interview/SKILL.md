---
name: handover-interview
description: Knowledge-handover ("exit") interview for an engineer who is leaving the project or company. Maps the code only they know from git history, interviews them with targeted questions (why, business reason, what breaks, workaround if it fails), records the full Q&A transcript and approved knowledge cards in docs/knowledge for the team to review in git. Run only when the user explicitly invokes it.
argument-hint: "[git email or name of the departing engineer]"
disable-model-invocation: true
allowed-tools: Bash(node .claude/skills/handover-interview/scripts/ownership.mjs:*), Bash(node .claude/skills/handover-interview/scripts/validate.mjs:*), Bash(node .claude/skills/handover-interview/scripts/index.mjs:*), Bash(git log:*), Bash(git show:*), Bash(git blame:*), Read, Grep, Glob
---

# Handover interview

You are running a **knowledge-handover interview**. Goal: capture what only this person knows, before they leave, as cited, code-linked knowledge cards that a new joiner can trust. Departing engineer (if given): `$ARGUMENTS`.

Work through the phases **in order**. Talk to the expert directly, warmly and briefly. **One question at a time.**

## Phase 0: Confirm (mandatory, before anything else)

Do **not** run git commands, read code, or create files until this phase is complete.

1. Use the AskUserQuestion tool to ask: **"Are you leaving the project or company, and do you want to run a knowledge-handover interview now?"**
   - **Yes, I'm leaving the company/project**
   - **Handing over specific areas only** (role change, vacation, vendor handover)
   - **No, cancel**
2. If the answer is **No** (or anything unclear), reply with one short line ("No problem, nothing was recorded.") and **stop**.
3. Explain consent in 5 short bullets and get an explicit "yes":
   - **Every question and your answer is recorded word for word** in a session transcript (`docs/knowledge/sessions/`), committed to git so the team can review the original answers.
   - **If an answer is incomplete** (no reason, no failure mode, no workaround, or vague), **I'll ask cross-questions** (follow-ups) until it's clear enough for a newcomer. Say "skip" or "next" any time to move on.
   - Answers are also turned into knowledge cards in `docs/knowledge/`; **you approve or edit every card**.
   - **You review the full transcript at the end** and can correct or redact any answer before it's committed. You can skip any question.
   - Never share passwords, tokens or personal data (they'd end up in git history).
4. Note the time of consent (it goes into the transcript as `consent: yes` and `consent_at`).
5. Ask for: their **name**, their **last working day** (optional) and, if handing over only some areas, **which areas**.

## Phase 1: Identify the person in git

1. Run `node .claude/skills/handover-interview/scripts/ownership.mjs --list-authors`.
2. Find every email/name that belongs to this person (people often have several aliases: work/personal email, name spellings). **Confirm the alias list with them.**

## Phase 2: Knowledge-risk map

1. Run `node .claude/skills/handover-interview/scripts/ownership.mjs --author "<alias1>,<alias2>" --top 10`.
2. Show the top hotspots as a short table (file, ownership %, last touch) and the **Knowledge at risk: N%** line. Explain the score in one sentence: _ownership × size × recency, minus files already covered by cards_.
3. Check `docs/knowledge/sessions/` for an earlier session with this person. If one has `status: in-progress`, offer to **resume** it (continue the same transcript with the next question number); otherwise start a new one.
4. Ask which hotspots to cover first (default: top 3; respect "specific areas only"). Also ask: **"Is there anything not in the code that only you know?"** (deploy steps, external contacts, incident playbooks, cron jobs, vendor quirks, environment setup). Add those as topics too.
5. **Create the transcript** `docs/knowledge/sessions/<YYYY-MM-DD>-<person-kebab>.md` from `.claude/skills/handover-interview/templates/session.md` with `status: in-progress`, `consent: yes`, `consent_at`, the aliases, the planned topics and the "before" coverage.

## Phase 3: Interview, per topic

**Prepare (silently, before asking):** read the file, `git log --follow -n 20 --format="%h %ad %s" --date=short -- <file>` for their commits, and `git show <sha> -- <file>` for the 2–3 most significant diffs. Note magic numbers, unusual conditions, workarounds, TODOs, retries/timeouts, and anything that looks odd.

**Generate 3–5 questions** for the topic. Rules:

- Never ask what the code already makes obvious ("what does this function do?").
- Quote their own work: _"Your commit `a1b2c3d` 'cap retries at 7' changed X. Why 7 and not 5?"_
- Cover these angles across the questions:
  1. **Why**: the real reason for the design or the odd value.
  2. **Business / executive reason**: which customer, contract, cost, SLA, incident or deadline drove it? Who cares if it changes?
  3. **What breaks if** it's changed or removed? What depends on it (other services, data, jobs)?
  4. **What did you try first** and why was it rejected?
  5. **If it fails: workaround / recovery**: symptoms, how to diagnose, the manual fix or rollback, and who to call.
- Ask **one question at a time**, wait for the answer.

**Follow-up judge / cross-questions** (after every answer): decide _follow-up_ or _next_. Ask a cross-question (max 2 per question, one at a time) when the answer:

- gives no reason ("that's just how it is", "legacy reasons", "it's complicated"),
- names no failure mode or no workaround,
- is vague about numbers, owners or systems ("some service", "a while ago"),
- contradicts the code or commit history (quote the line or commit and ask which is right),
- describes intended behaviour the code doesn't implement yet (ask who/what should do it and what happens until then).
  Make the cross-question concrete: _"What would a new person see first if this broke at 2 a.m.?"_
  Briefly acknowledge what was answered before asking ("Got it: X. One follow-up: …"). If the expert says "skip"/"next", record it and move on.
  If the message isn't an answer (an instruction, a question back, a request to pause), respond to it, don't record it as an answer, then repeat the open question.

**Record every exchange in the transcript immediately** (append after each answer, so nothing is lost if the session stops):

- Number questions across the whole session: `Q1`, `Q2`, … and follow-ups as `Q3.1`, `Q3.2`.
- Put an **explicit anchor** on its own line above every question heading: `<a id="q3"></a>` for `Q3`, `<a id="q3-1"></a>` for `Q3.1` (dot becomes dash). Cards link to these IDs; GitHub's auto-generated heading anchors are not stable.
- Store the **question exactly as asked**, **why it was asked** (file/lines/commit that prompted it), and the **answer verbatim**: don't summarise, correct or reword the expert's words. Only fix obvious typos if they ask.
- Record skipped questions as `_Skipped by expert._` and "don't know" as given.
- If the answer contains a secret (token, password, credentialed URL), replace just that value with `<redacted>` and tell the expert.

Keep each session to about **20 minutes** (roughly 2–3 topics). Offer a break between topics.

## Phase 4: Knowledge card, per topic

1. Draft a card using `.claude/skills/handover-interview/templates/card.md`. Use **only what the expert said** plus facts from the code and commits. Never invent reasons. Mark gaps as `Not captured yet`.
2. Link exact **file paths and line ranges** (verify line numbers against the current file), the **commit SHAs** you discussed, and the **transcript answers** it is based on (`transcript:` in the frontmatter, e.g. `sessions/2026-10-20-jane-doe.md#q3` or `#q3-1`), so reviewers can check the card against the original words.
3. Set `confidence`: `high` (clear, specific answer), `medium` (partly vague), `low` (guess or unsure).
4. **Show the card and ask for approval** with AskUserQuestion: **Approve** / **Edit** (they say what to change) / **Discard**. Never save without "Approve". On approval set `approved_by` (the expert's name) and `approved_at` (today).
5. On approval, save to `docs/knowledge/<area>/<kebab-title>.md` (area = top-level module, e.g. `api-books`, `web`, `infra`) and note the card link under the topic in the transcript (`Card: …` or `Card: discarded`).
6. Scan the card for secrets before saving (keys, tokens, passwords, connection strings with credentials). Replace them with `<redacted>` and tell the expert. (`validate.mjs` double-checks this at the end.)

## Phase 5: Wrap up

1. Rerun the ownership script and show **Knowledge at risk: before → after**.
2. Complete the transcript's summary section: topics covered (with card links), topics still open, coverage before → after.
3. **Transcript review:** point the expert to the file and ask with AskUserQuestion: **Approve as is** / **Correct or redact answers** (apply exactly the changes they ask for, marking each changed answer with `_(edited by expert on review)_`) / **Remove the transcript** (delete the file; cards stay). Then set `status: reviewed` and `reviewed_at`, `status: closed-partial` and `reviewed_at` if they want to stop for good with topics left open, or keep `status: in-progress` if they want to continue in another session.
4. Run `node .claude/skills/handover-interview/scripts/index.mjs` to regenerate `docs/knowledge/INDEX.md` (never edit its tables by hand).
5. Run `node .claude/skills/handover-interview/scripts/validate.mjs`. Fix every ERROR it reports (broken links, line ranges, missing approval or consent fields, possible secrets) and rerun until it passes.
6. List the **remaining hotspots** and suggest scheduling another session.
7. Remind them to commit **both** the transcript and the cards, ideally via a pull request so teammates can review the answers:
   `git add docs/knowledge` then `git commit -m "docs(knowledge): handover session with <name>"`. **Do not commit yourself.**

## Rules

- The expert is in control: they can skip, pause or stop at any time. Respect it immediately.
- Never put secrets or personal data in cards or transcripts. Never read `.env` files.
- The transcript is the source of truth: cards summarise it, they never add claims the expert didn't make.
- Prefer specific over complete: one precise card beats five vague ones.
- New joiners query the cards with `/ask-why`, so write titles and the "Why" section the way a newcomer would ask.
