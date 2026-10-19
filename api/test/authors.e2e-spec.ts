import {
  createAuthor,
  createBook,
  createCategory,
  createTestApp,
  resetDatabase,
  type TestContext,
  UNKNOWN_ID,
} from './utils/e2e-app.js';

describe('Authors (e2e)', () => {
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

  it('creates an author without a bio (bio is null)', async () => {
    const res = await ctx
      .http()
      .post('/api/authors')
      .send({ name: 'Isaac Asimov' })
      .expect(201);

    expect(res.body).toMatchObject({ name: 'Isaac Asimov', bio: null });
  });

  it('creates an author with a bio', async () => {
    const res = await ctx
      .http()
      .post('/api/authors')
      .send({ name: 'Isaac Asimov', bio: 'Writer and professor' })
      .expect(201);

    expect(res.body.bio).toBe('Writer and professor');
  });

  it('allows two authors with the same name', async () => {
    await createAuthor(ctx.http, 'John Smith');
    await createAuthor(ctx.http, 'John Smith');

    const res = await ctx.http().get('/api/authors').expect(200);
    expect(res.body).toHaveLength(2);
  });

  it('rejects a missing name and a non-string bio', async () => {
    const res = await ctx
      .http()
      .post('/api/authors')
      .send({ bio: 123 })
      .expect(400);

    expect(res.body.message).toEqual(
      expect.arrayContaining([
        'name should not be empty',
        'bio must be a string',
      ]),
    );
  });

  it('updates only the fields sent', async () => {
    const author = await createAuthor(ctx.http, 'Ursula K. Le Guin');

    const res = await ctx
      .http()
      .patch(`/api/authors/${author.id}`)
      .send({ bio: 'Updated bio' })
      .expect(200);

    expect(res.body).toMatchObject({
      name: 'Ursula K. Le Guin',
      bio: 'Updated bio',
    });
  });

  it('returns 404 for an unknown author', async () => {
    await ctx.http().get(`/api/authors/${UNKNOWN_ID}`).expect(404);
  });

  it('deleting an author removes them from their books', async () => {
    const category = await createCategory(ctx.http);
    const author = await createAuthor(ctx.http);
    const book = await createBook(ctx.http, {
      categoryId: category.id,
      authorIds: [author.id],
    });

    await ctx.http().delete(`/api/authors/${author.id}`).expect(204);

    const res = await ctx.http().get(`/api/books/${book.id}`).expect(200);
    expect(res.body.authors).toEqual([]);
  });
});
