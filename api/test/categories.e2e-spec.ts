import {
  createBook,
  createCategory,
  createTestApp,
  errorShape,
  resetDatabase,
  type TestContext,
  UNKNOWN_ID,
} from './utils/e2e-app.js';

describe('Categories (e2e)', () => {
  let ctx: TestContext;

  beforeAll(async () => {
    ctx = await createTestApp();
  });

  beforeEach(async () => {
    await resetDatabase(ctx.prisma);
  });

  afterAll(async () => {
    await ctx.app.close();
  });

  describe('POST /api/categories', () => {
    it('creates a category and trims the name', async () => {
      const res = await ctx
        .http()
        .post('/api/categories')
        .send({ name: '  Fantasy  ' })
        .expect(201);

      expect(res.body).toMatchObject({
        id: expect.any(String),
        name: 'Fantasy',
        createdAt: expect.any(String),
        updatedAt: expect.any(String),
      });
    });

    it('returns 409 for a duplicate name', async () => {
      await createCategory(ctx.http, 'Fantasy');

      const res = await ctx
        .http()
        .post('/api/categories')
        .send({ name: 'Fantasy' })
        .expect(409);

      expect(res.body).toEqual(errorShape(409, 'CONFLICT'));
    });

    it('returns 400 with a list of messages for an empty name', async () => {
      const res = await ctx
        .http()
        .post('/api/categories')
        .send({ name: '   ' })
        .expect(400);

      expect(res.body.message).toContain('name should not be empty');
    });

    it('returns 400 for a name longer than 60 characters', async () => {
      await ctx
        .http()
        .post('/api/categories')
        .send({ name: 'x'.repeat(61) })
        .expect(400);
    });

    it('rejects unknown properties', async () => {
      const res = await ctx
        .http()
        .post('/api/categories')
        .send({ name: 'Fantasy', color: 'red' })
        .expect(400);

      expect(res.body.message).toContain('property color should not exist');
    });
  });

  describe('GET', () => {
    it('lists categories sorted by name', async () => {
      await createCategory(ctx.http, 'Mystery');
      await createCategory(ctx.http, 'Fantasy');

      const res = await ctx.http().get('/api/categories').expect(200);

      expect(res.body.map((c: { name: string }) => c.name)).toEqual([
        'Fantasy',
        'Mystery',
      ]);
    });

    it('gets one by id', async () => {
      const category = await createCategory(ctx.http);
      const res = await ctx
        .http()
        .get(`/api/categories/${category.id}`)
        .expect(200);
      expect(res.body.id).toBe(category.id);
    });

    it('returns 400 for a malformed id', async () => {
      await ctx.http().get('/api/categories/abc').expect(400);
    });

    it('returns 404 for an unknown id', async () => {
      const res = await ctx
        .http()
        .get(`/api/categories/${UNKNOWN_ID}`)
        .expect(404);
      expect(res.body).toEqual(errorShape(404, 'NOT_FOUND'));
    });
  });

  describe('PATCH /api/categories/:id', () => {
    it('renames a category', async () => {
      const category = await createCategory(ctx.http, 'Sci-Fi');

      const res = await ctx
        .http()
        .patch(`/api/categories/${category.id}`)
        .send({ name: 'Science Fiction' })
        .expect(200);

      expect(res.body.name).toBe('Science Fiction');
    });

    it('returns 404 for an unknown id', async () => {
      await ctx
        .http()
        .patch(`/api/categories/${UNKNOWN_ID}`)
        .send({ name: 'X' })
        .expect(404);
    });
  });

  describe('DELETE /api/categories/:id', () => {
    it('deletes a category (204) so it is gone afterwards', async () => {
      const category = await createCategory(ctx.http);

      await ctx.http().delete(`/api/categories/${category.id}`).expect(204);
      await ctx.http().get(`/api/categories/${category.id}`).expect(404);
    });

    it('returns 404 for an unknown id', async () => {
      await ctx.http().delete(`/api/categories/${UNKNOWN_ID}`).expect(404);
    });

    it('returns 409 while books still use the category', async () => {
      const category = await createCategory(ctx.http);
      await createBook(ctx.http, { categoryId: category.id });

      const res = await ctx
        .http()
        .delete(`/api/categories/${category.id}`)
        .expect(409);

      expect(res.body).toEqual(errorShape(409, 'CONFLICT'));
    });
  });
});
