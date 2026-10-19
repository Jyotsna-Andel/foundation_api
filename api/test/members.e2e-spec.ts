import {
  createMember,
  createTestApp,
  errorShape,
  resetDatabase,
  type TestContext,
  UNKNOWN_ID,
} from './utils/e2e-app.js';

describe('Members (e2e)', () => {
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

  it('creates an ACTIVE member with a normalised email', async () => {
    const res = await ctx
      .http()
      .post('/api/members')
      .send({ name: 'Jane Doe', email: '  Jane.Doe@Example.COM ' })
      .expect(201);

    expect(res.body).toMatchObject({
      email: 'jane.doe@example.com',
      status: 'ACTIVE',
    });
  });

  it('treats emails case-insensitively when checking duplicates (409)', async () => {
    await createMember(ctx.http, 'jane@example.com');

    const res = await ctx
      .http()
      .post('/api/members')
      .send({ name: 'Other Jane', email: 'JANE@example.com' })
      .expect(409);

    expect(res.body).toEqual(errorShape(409, 'CONFLICT'));
  });

  it('rejects an invalid email and an unknown status', async () => {
    const res = await ctx
      .http()
      .post('/api/members')
      .send({ name: 'Jane', email: 'not-an-email', status: 'BANNED' })
      .expect(400);

    expect(res.body.message).toEqual(
      expect.arrayContaining([
        'email must be an email',
        expect.stringContaining('status must be one of'),
      ]),
    );
  });

  it('suspends a member', async () => {
    const member = await createMember(ctx.http);

    const res = await ctx
      .http()
      .patch(`/api/members/${member.id}`)
      .send({ status: 'SUSPENDED' })
      .expect(200);

    expect(res.body.status).toBe('SUSPENDED');
  });

  it('returns 409 when changing to an email another member uses', async () => {
    await createMember(ctx.http, 'taken@example.com');
    const member = await createMember(ctx.http, 'mine@example.com');

    await ctx
      .http()
      .patch(`/api/members/${member.id}`)
      .send({ email: 'taken@example.com' })
      .expect(409);
  });

  it('deletes a member (204), then 404', async () => {
    const member = await createMember(ctx.http);

    await ctx.http().delete(`/api/members/${member.id}`).expect(204);
    await ctx.http().get(`/api/members/${member.id}`).expect(404);
    await ctx.http().delete(`/api/members/${UNKNOWN_ID}`).expect(404);
  });
});
