---
title: <Question a newcomer would ask, e.g. "Why does payment retry stop at 7 attempts?">
owner: <Name of the expert>
captured: <YYYY-MM-DD>
session: sessions/<YYYY-MM-DD>-<person>.md
transcript: # the Q&A this card is based on (anchors: q1, q1-1, q2, ...)
  - sessions/<YYYY-MM-DD>-<person>.md#q1
  - sessions/<YYYY-MM-DD>-<person>.md#q1-1
confidence: <high | medium | low>
approved_by: <Name of the expert>
approved_at: <YYYY-MM-DD>
files:
  - path: <repo-relative/path/to/file.ts>
    lines: <start>-<end>
commits:
  - <short-sha> <commit subject>
tags: [<area>, <topic>]
---

# <Title>

## Why it is like this

<The real reason, in the expert's words where possible.>

## Business / executive reason

<Customer, contract, SLA, cost, incident or deadline behind it. Who is affected if it changes. "Not captured yet" if unknown.>

## Gotchas

- <Non-obvious behaviour, hidden dependency, ordering, timing, data assumption>

## What breaks if you change it

- <Concrete consequence: which service, job, report or customer flow>

## If it fails: workaround / recovery

1. **Symptoms:** <what you see: error, alert, log line, customer report>
2. **Diagnose:** <where to look, command or query to run>
3. **Fix / workaround:** <manual steps, config toggle, rollback>
4. **Escalate to:** <team, vendor, contact (role, not personal phone numbers)>

## How to change it safely

1. <Step: e.g. add a test first, feature flag, deploy order, data migration>

## Alternatives already tried

- <What was tried first and why it was rejected>

## Open questions

- <Anything the expert was unsure about, so the next owner can verify>
