import { INestApplication } from '@nestjs/common';
import { Test } from '@nestjs/testing';
import request from 'supertest';
import type { App } from 'supertest/types.js';
import { AppModule } from '../../src/app.module.js';
import { configureApp } from '../../src/app.setup.js';
import { PrismaService } from '../../src/prisma/prisma.service.js';
import { assertTestDatabase } from '../e2e-env.js';

export interface TestContext {
  app: INestApplication<App>;
  prisma: PrismaService;
  /** Supertest client bound to the running app. */
  http: () => ReturnType<typeof request>;
}

/** Boots the real AppModule (same setup as main.ts) against the test database. */
export async function createTestApp(): Promise<TestContext> {
  const moduleRef = await Test.createTestingModule({
    imports: [AppModule],
  }).compile();

  const app = moduleRef.createNestApplication<INestApplication<App>>();
  configureApp(app);
  await app.init();

  return {
    app,
    prisma: app.get(PrismaService),
    http: () => request(app.getHttpServer()),
  };
}

/** Empties every table so each test starts from a known state. */
export async function resetDatabase(prisma: PrismaService) {
  assertTestDatabase(process.env.DATABASE_URL);
  await prisma.$executeRawUnsafe(
    'TRUNCATE TABLE "loans", "_AuthorToBook", "books", "authors", "categories", "members" RESTART IDENTITY CASCADE',
  );
}

export const UNKNOWN_ID = '00000000-0000-4000-8000-000000000000';

/** Matches the error body produced by AllExceptionsFilter. */
export const errorShape = (statusCode: number, error: string) => ({
  statusCode,
  error,
  message: expect.anything(),
  path: expect.stringMatching(/^\/api\//),
  timestamp: expect.any(String),
});

// --- Test data factories (create through the API, return the response body) --

type Http = TestContext['http'];

export async function createCategory(http: Http, name = 'Science Fiction') {
  const res = await http().post('/api/categories').send({ name }).expect(201);
  return res.body as { id: string; name: string };
}

export async function createAuthor(http: Http, name = 'Ursula K. Le Guin') {
  const res = await http().post('/api/authors').send({ name }).expect(201);
  return res.body as { id: string; name: string };
}

export async function createMember(
  http: Http,
  email = 'jane@example.com',
  name = 'Jane Doe',
) {
  const res = await http()
    .post('/api/members')
    .send({ name, email })
    .expect(201);
  return res.body as { id: string; email: string; status: string };
}

export async function createBook(
  http: Http,
  overrides: Record<string, unknown> & { categoryId: string },
) {
  const res = await http()
    .post('/api/books')
    .send({
      isbn: '9780441478125',
      title: 'The Left Hand of Darkness',
      totalCopies: 2,
      ...overrides,
    })
    .expect(201);
  return res.body as {
    id: string;
    isbn: string;
    totalCopies: number;
    availableCopies: number;
  };
}
