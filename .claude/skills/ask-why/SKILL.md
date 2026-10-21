---
name: ask-why
description: Answer "why is the code like this?" questions from the team's captured knowledge cards, handover interview transcripts (docs/knowledge) and git history, citing every claim as [card:path], [transcript:path#qN] or [commit:sha]. Says "Not captured yet" instead of guessing. Use when someone asks why code, config or a process is the way it is, what breaks if it changes, or how to recover when it fails.
argument-hint: '<question, e.g. "why does loan due date default to 14 days?">'
---

# Ask why

Answer the question **only from evidence**: knowledge cards, interview transcripts and git history. Question: `$ARGUMENTS`

## 1. Retrieve

1. Search the cards: use Grep over `docs/knowledge/` (skip `sessions/`) for the key terms of the question, file names and identifiers. Read the frontmatter `title`, `files`, `commits` and the matching sections of the best 1–5 cards.
2. If the question names a file or symbol, also find cards whose `files:` list that path.
3. For the original words behind a card, open the transcript entries listed in its `transcript:` field (`docs/knowledge/sessions/…#qN`). Also Grep the transcripts when no card matches: an answer may have been given without a card.
4. Check the code and history for supporting facts: `git log -n 10 --format="%h %ad %an %s" --date=short -- <file>` and, if needed, `git show <sha> -- <file>`.

## 2. Answer

- Lead with the direct answer in 1–3 sentences, then details (why, business reason, what breaks, workaround) only if relevant.
- **Cite every claim** inline: `[card:docs/knowledge/<area>/<file>.md]`, `[transcript:docs/knowledge/sessions/<file>.md#q3]` or `[commit:<short-sha>]`. Prefer cards (approved summaries); cite the transcript for exact wording or when no card exists. Only use transcripts with `status: reviewed` or `closed-partial` (both reviewed by the expert); for `in-progress` ones, say the answer is from an unreviewed session. Transcript anchors look like `#q3` and `#q3-1`. A sentence without a citation must not state a reason or fact about intent.
- Mention the card's `owner`, `captured` date and `confidence`. If confidence is `low` or the card is old and the file changed a lot since, say so.
- Code facts you just read (what the code does) may be stated with a file reference like `api/src/loans/loans.service.ts:12`, but **intent and reasons need a card or commit**.

## 3. When there is no evidence

If no card, transcript or commit explains the _why_, reply exactly:

> **Not captured yet.** Suggest asking <owner>.

Find `<owner>` from the most relevant hotspot: run
`node .claude/skills/handover-interview/scripts/ownership.mjs --list-authors` and
`git log -n 20 --format="%an" -- <file>` to name the main author of that file. Then suggest capturing it with `/handover-interview`.

Never guess intent, never fill gaps from general knowledge, and never present a plausible reason as fact.
