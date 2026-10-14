import { vi } from 'vitest';
import type { PrismaService } from '../../src/prisma/prisma.service.js';

const modelMock = () => ({
  create: vi.fn(),
  findMany: vi.fn(),
  findUnique: vi.fn(),
  update: vi.fn(),
  delete: vi.fn(),
});

/**
 * In-memory stand-in for PrismaService: every model method is a `vi.fn()`.
 * `$transaction(fn)` runs `fn` with the same mock as the transaction client.
 */
export function createPrismaMock() {
  const mock = {
    category: modelMock(),
    author: modelMock(),
    member: modelMock(),
    book: modelMock(),
    loan: modelMock(),
    $transaction: vi.fn(),
  };
  mock.$transaction.mockImplementation((fn: (tx: typeof mock) => unknown) =>
    fn(mock),
  );
  return mock;
}

export type PrismaMock = ReturnType<typeof createPrismaMock>;

export const asPrismaService = (mock: PrismaMock) =>
  mock as unknown as PrismaService;
