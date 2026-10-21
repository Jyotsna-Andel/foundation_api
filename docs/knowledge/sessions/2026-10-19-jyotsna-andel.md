---
person: Jyotsna Andel
aliases: [jyotsnaandel.1998@gmail.com, Jyotsna Andel]
date: 2026-10-19
last_working_day: 2026-10-20
interviewer: Claude Code (/handover-interview)
consent: yes
consent_at: 2026-10-19
status: closed-partial # in-progress | reviewed | closed-partial
reviewed_at: 2026-10-21
coverage_before: 100%
coverage_after: 100%
---

# Handover session: Jyotsna Andel, 2026-10-19

Full record of the interview: every question as asked and every answer word for word. Knowledge cards summarise these answers and link back to the anchors below (`#q1`, `#q1-1`, …).

## Summary

- **Topics planned:** Data model (`api/prisma/schema.prisma`)
- **Topics covered:** Data model, partly (Q1 answered; follow-up Q1.1 not answered). No card created.
- **Still open:** how `availableCopies` is kept in sync on borrow/return (Q1.1); remaining data-model questions (delete rules, late fee); all other hotspots (UI pages, `books.service.ts`, `loans.service.ts`).
- **Not in the code:** Expert said there is nothing to add ("no").
- **Knowledge at risk:** 100% → 100% (no cards created)
- **Closed:** session closed as partial at the expert's request on 2026-10-21, after the last working day.

---

## Topic 1: `api/prisma/schema.prisma` (100% owned)

<a id="q1"></a>

### Q1

**Question:** In `schema.prisma` (lines 50–51), a book stores **both** `totalCopies` and `availableCopies` as columns, instead of working out "available" by counting the loans that haven't been returned. That means the two can drift apart if someone forgets to update one. Why did you choose to store `availableCopies` rather than calculate it from the loans table?

**Why asked:** `api/prisma/schema.prisma:50-51`, commit `05979c6` "initial commit": stored counter that can drift from the `loans` table.

**Answer:** there are counts we have and avavilable is just a status. Once no copies available, count will be 0 and status will get changed. this will save recalculation. _(edited by expert on review)_

<a id="q1-1"></a>

### Q1.1 (follow-up)

**Question:** Right now, creating a loan **doesn't** decrease `availableCopies`, and returning one doesn't increase it. Who or what should keep `availableCopies` in sync when a book is borrowed or returned, and what should happen when someone tries to borrow a book that's at 0?

**Why asked:** `api/src/loans/loans.service.ts` creates and updates loans without changing `availableCopies` (comment: "Stock changes … arrive with the borrow/return endpoints in Phase 4").

**Answer:** _Not answered: session closed as partial before an answer was given._

**Card:** none (topic not complete)
