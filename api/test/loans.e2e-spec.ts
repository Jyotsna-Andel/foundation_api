import {
  createBook,
  createCategory,
  createMember,
  createTestApp,
  resetDatabase,
  type TestContext,
  UNKNOWN_ID,
} from './utils/e2e-app.js';

const DAY_MS = 24 * 60 * 60 * 1000;

describe('Loans (e2e)', () => {
  let ctx: TestContext;
  let bookId: string;
  let memberId: string;

  const createLoan = async (body: Record<string, unknown> = {}) =>
    (
      await ctx
        .http()
        .post('/api/loans')
        .send({ bookId, memberId, ...body })
        .expect(201)
    ).body as { id: string; borrowedAt: string; dueAt: string };

  beforeAll(async () => {
    ctx = await createTestApp();
  });

  beforeEach(async () => {
    await resetDatabase(ctx.prisma);
    const category = await createCategory(ctx.http);
    bookId = (await createBook(ctx.http, { categoryId: category.id })).id;
    memberId = (await createMember(ctx.http)).id;
  });

  afterAll(async () => {
    await ctx.app.close();
  });

  describe('POST /api/loans', () => {
    it('creates a loan due in 14 days, with book and member details', async () => {
      const res = await ctx
        .http()
        .post('/api/loans')
        .send({ bookId, memberId })
        .expect(201);

      const days =
        (new Date(res.body.dueAt).getTime() -
          new Date(res.body.borrowedAt).getTime()) /
        DAY_MS;
      expect(days).toBeCloseTo(14, 1);
      expect(res.body).toMatchObject({
        returnedAt: null,
        lateFee: '0',
        book: { id: bookId, title: 'The Left Hand of Darkness' },
        member: { id: memberId, email: 'jane@example.com' },
      });
    });

    it('accepts an explicit future due date', async () => {
      const dueAt = new Date(Date.now() + 7 * DAY_MS).toISOString();
      const loan = await createLoan({ dueAt });
      expect(loan.dueAt).toBe(dueAt);
    });

    it('rejects a due date in the past (400)', async () => {
      const res = await ctx
        .http()
        .post('/api/loans')
        .send({ bookId, memberId, dueAt: '2020-01-01T00:00:00.000Z' })
        .expect(400);

      expect(res.body.message).toBe('dueAt must be in the future');
    });

    it('rejects a malformed date and malformed ids (400)', async () => {
      const res = await ctx
        .http()
        .post('/api/loans')
        .send({ bookId: 'x', memberId: 'y', dueAt: 'tomorrow' })
        .expect(400);

      expect(res.body.message).toEqual(
        expect.arrayContaining([
          'bookId must be a UUID',
          'memberId must be a UUID',
          'dueAt must be a Date instance',
        ]),
      );
    });

    it('returns 404 for an unknown book or member', async () => {
      await ctx
        .http()
        .post('/api/loans')
        .send({ bookId: UNKNOWN_ID, memberId })
        .expect(404);
      await ctx
        .http()
        .post('/api/loans')
        .send({ bookId, memberId: UNKNOWN_ID })
        .expect(404);
    });
  });

  describe('PATCH /api/loans/:id', () => {
    it('marks a loan as returned', async () => {
      const loan = await createLoan();
      const returnedAt = new Date().toISOString();

      const res = await ctx
        .http()
        .patch(`/api/loans/${loan.id}`)
        .send({ returnedAt })
        .expect(200);

      expect(res.body.returnedAt).toBe(returnedAt);
    });

    it('rejects a return date before the borrow date (400)', async () => {
      const loan = await createLoan();

      await ctx
        .http()
        .patch(`/api/loans/${loan.id}`)
        .send({ returnedAt: '2020-01-01T00:00:00.000Z' })
        .expect(400);
    });

    it('cannot move a loan to another book', async () => {
      const loan = await createLoan();

      const res = await ctx
        .http()
        .patch(`/api/loans/${loan.id}`)
        .send({ bookId: UNKNOWN_ID })
        .expect(400);

      expect(res.body.message).toContain('property bookId should not exist');
    });

    it('returns 404 for an unknown loan', async () => {
      await ctx
        .http()
        .patch(`/api/loans/${UNKNOWN_ID}`)
        .send({ returnedAt: new Date().toISOString() })
        .expect(404);
    });
  });

  it('lists loans newest first, and deletes them', async () => {
    const first = await createLoan();
    const second = await createLoan();

    const list = await ctx.http().get('/api/loans').expect(200);
    expect(list.body.map((l: { id: string }) => l.id)).toEqual([
      second.id,
      first.id,
    ]);

    await ctx.http().delete(`/api/loans/${first.id}`).expect(204);
    await ctx.http().get(`/api/loans/${first.id}`).expect(404);
  });
});
