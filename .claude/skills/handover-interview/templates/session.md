---
person: <Name>
aliases: [<email>, <name as in git>]
date: <YYYY-MM-DD>
last_working_day: <YYYY-MM-DD or unknown>
interviewer: Claude Code (/handover-interview)
consent: yes
consent_at: <YYYY-MM-DD HH:MM>
status: in-progress # in-progress | reviewed | closed-partial
reviewed_at: <YYYY-MM-DD, set when status becomes reviewed or closed-partial>
coverage_before: <N>%
coverage_after: <N>%
---

# Handover session: <Name>, <YYYY-MM-DD>

Full record of the interview: every question as asked and every answer word for word. Knowledge cards summarise these answers and link back to the anchors below (`#q1`, `#q1-1`, …).

## Summary

- **Topics covered:** <topic → card link>
- **Still open:** <hotspots or topics not covered yet>
- **Knowledge at risk:** <before>% → <after>%

---

## Topic 1: `<path/to/file.ts>` (<ownership>% owned)

<a id="q1"></a>

### Q1

**Question:** <exactly as asked>

**Why asked:** `<path>:<lines>`, commit `<sha>` "<subject>"

**Answer:** <verbatim answer>

<a id="q1-1"></a>

### Q1.1 (follow-up)

**Question:** <follow-up as asked>

**Answer:** <verbatim answer>

<a id="q2"></a>

### Q2

**Question:** <...>

**Answer:** _Skipped by expert._

**Card:** [<card title>](../<area>/<card-file>.md)

---

## Topic 2: <Not in the code: e.g. "Production deploy steps">

<a id="q3"></a>

### Q3

**Question:** <...>

**Answer:** <...>

**Card:** [<card title>](../<area>/<card-file>.md)
