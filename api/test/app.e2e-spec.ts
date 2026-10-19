import {
  createTestApp,
  errorShape,
  type TestContext,
} from './utils/e2e-app.js';

describe('App (e2e)', () => {
  let ctx: TestContext;

  beforeAll(async () => {
    ctx = await createTestApp();
  });

  afterAll(async () => {
    await ctx.app.close();
  });

  it('GET /api responds', async () => {
    await ctx.http().get('/api').expect(200).expect('Hello World!');
  });

  it('routes live under the /api prefix', async () => {
    await ctx.http().get('/categories').expect(404);
  });

  it('unknown routes return the standard error shape', async () => {
    const res = await ctx.http().get('/api/nope').expect(404);
    expect(res.body).toEqual(errorShape(404, 'NOT_FOUND'));
  });

  it('rejects malformed JSON with 400', async () => {
    const res = await ctx
      .http()
      .post('/api/categories')
      .set('Content-Type', 'application/json')
      .send('{"name": ')
      .expect(400);
    expect(res.body).toEqual(errorShape(400, 'BAD_REQUEST'));
  });
});
