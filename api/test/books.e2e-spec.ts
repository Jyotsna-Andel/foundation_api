import {
  createAuthor,
  createBook,
  createCategory,
  createMember,
  createTestApp,
  errorShape,
  resetDatabase,
  type TestContext,
  UNKNOWN_ID,
} from './utils/e2e-app.js';

describe('Books (e2e)', () => {
  let ctx: TestContext;
  let categoryId: string;

  beforeAll(async () => {
    ctx = await createTestApp();
  });

  beforeEach(async () => {
    await resetDatabase(ctx.prisma);
    categoryId = (await createCategory(ctx.http)).id;
  });

  afterAll(async () => {
    await ctx.app.close();
  });

  describe('POST /api/books', () => {
    it('creates a book with its category and authors', async () => {
      const a1 = await createAuthor(ctx.http, 'Author One');
      const a2 = await createAuthor(ctx.http, 'Author Two');

      const res = await ctx
        .http()
        .post('/api/books')
        .send({
          isbn: '978-0-441-47812-5',
          title: 'The Left Hand of Darkness',
          publishedYear: 1969,
          totalCopies: 3,
          categoryId,
          authorIds: [a1.id, a2.id],
        })
        .expect(201);

      expect(res.body).toMatchObject({
        isbn: '9780441478125', // hyphens removed
        totalCopies: 3,
        availableCopies: 3,
        category: { id: categoryId, name: 'Science Fiction' },
      });
      expect(
        res.body.authors.map((a: { name: string }) => a.name).sort(),
      ).toEqual(['Author One', 'Author Two']);
    });

    it('defaults to one copy and no authors', async () => {
      const res = await ctx
        .http()
        .post('/api/books')
        .send({ isbn: '9780441478125', title: 'X', categoryId })
        .expect(201);

      expect(res.body).toMatchObject({
        totalCopies: 1,
        availableCopies: 1,
        authors: [],
      });
    });

    it('rejects an ISBN with a wrong checksum', async () => {
      const res = await ctx
        .http()
        .post('/api/books')
        .send({ isbn: '9780441478120', title: 'X', categoryId })
        .expect(400);

      expect(res.body.message).toEqual(
        expect.arrayContaining([expect.stringContaining('isbn')]),
      );
    });

    it('returns 409 for a duplicate ISBN', async () => {
      await createBook(ctx.http, { categoryId });

      const res = await ctx
        .http()
        .post('/api/books')
        .send({ isbn: '978-0441478125', title: 'Copy', categoryId })
        .expect(409);

      expect(res.body).toEqual(errorShape(409, 'CONFLICT'));
    });

    it('returns 404 when the category does not exist', async () => {
      await ctx
        .http()
        .post('/api/books')
        .send({ isbn: '9780441478125', title: 'X', categoryId: UNKNOWN_ID })
        .expect(404);
    });

    it('returns 404 when an author does not exist', async () => {
      await ctx
        .http()
        .post('/api/books')
        .send({
          isbn: '9780441478125',
          title: 'X',
          categoryId,
          authorIds: [UNKNOWN_ID],
        })
        .expect(404);
    });

    it('cannot set availableCopies directly', async () => {
      const res = await ctx
        .http()
        .post('/api/books')
        .send({
          isbn: '9780441478125',
          title: 'X',
          categoryId,
          availableCopies: 99,
        })
        .expect(400);

      expect(res.body.message).toContain(
        'property availableCopies should not exist',
      );
    });
  });

  describe('PATCH /api/books/:id', () => {
    it('replaces the author list', async () => {
      const a1 = await createAuthor(ctx.http, 'Author One');
      const a2 = await createAuthor(ctx.http, 'Author Two');
      const book = await createBook(ctx.http, {
        categoryId,
        authorIds: [a1.id],
      });

      const res = await ctx
        .http()
        .patch(`/api/books/${book.id}`)
        .send({ authorIds: [a2.id] })
        .expect(200);

      expect(res.body.authors).toEqual([{ id: a2.id, name: 'Author Two' }]);
    });

    it('shifts availableCopies when totalCopies changes', async () => {
      const book = await createBook(ctx.http, { categoryId, totalCopies: 3 });
      // Simulate 2 copies on loan (borrow endpoints come in Phase 4).
      await ctx.prisma.book.update({
        where: { id: book.id },
        data: { availableCopies: 1 },
      });

      const res = await ctx
        .http()
        .patch(`/api/books/${book.id}`)
        .send({ totalCopies: 5 })
        .expect(200);

      expect(res.body).toMatchObject({ totalCopies: 5, availableCopies: 3 });
    });

    it('returns 409 when totalCopies would drop below copies on loan', async () => {
      const book = await createBook(ctx.http, { categoryId, totalCopies: 3 });
      await ctx.prisma.book.update({
        where: { id: book.id },
        data: { availableCopies: 1 },
      });

      const res = await ctx
        .http()
        .patch(`/api/books/${book.id}`)
        .send({ totalCopies: 1 })
        .expect(409);

      expect(res.body.message).toContain('2 copies are on loan');
    });

    it('returns 404 for an unknown book', async () => {
      await ctx
        .http()
        .patch(`/api/books/${UNKNOWN_ID}`)
        .send({ title: 'X' })
        .expect(404);
    });
  });

  describe('DELETE /api/books/:id', () => {
    it('deletes a book without loans (204)', async () => {
      const book = await createBook(ctx.http, { categoryId });
      await ctx.http().delete(`/api/books/${book.id}`).expect(204);
      await ctx.http().get(`/api/books/${book.id}`).expect(404);
    });

    it('returns 409 while the book has loans', async () => {
      const book = await createBook(ctx.http, { categoryId });
      const member = await createMember(ctx.http);
      await ctx
        .http()
        .post('/api/loans')
        .send({ bookId: book.id, memberId: member.id })
        .expect(201);

      await ctx.http().delete(`/api/books/${book.id}`).expect(409);
    });
  });
});
