import { BadRequestException, NotFoundException } from '@nestjs/common';
import {
  asPrismaService,
  createPrismaMock,
  type PrismaMock,
} from '../../test/utils/prisma-mock.js';
import { LoansService } from './loans.service.js';

describe('LoansService', () => {
  let prisma: PrismaMock;
  let service: LoansService;
  const id = '88888888-8888-4888-8888-888888888888';
  const bookId = '44444444-4444-4444-8444-444444444444';
  const memberId = '33333333-3333-4333-8333-333333333333';
  const now = new Date('2026-10-14T10:00:00.000Z');

  beforeEach(() => {
    vi.useFakeTimers();
    vi.setSystemTime(now);
    prisma = createPrismaMock();
    service = new LoansService(asPrismaService(prisma));
  });

  afterEach(() => {
    vi.useRealTimers();
  });

  describe('create()', () => {
    it('defaults dueAt to 14 days from now and connects book and member', async () => {
      await service.create({ bookId, memberId });

      const { data } = prisma.loan.create.mock.calls[0][0];
      expect(data.dueAt).toEqual(new Date('2026-10-28T10:00:00.000Z'));
      expect(data.book).toEqual({ connect: { id: bookId } });
      expect(data.member).toEqual({ connect: { id: memberId } });
    });

    it('accepts an explicit future dueAt', async () => {
      const dueAt = new Date('2026-11-01T00:00:00.000Z');
      await service.create({ bookId, memberId, dueAt });

      expect(prisma.loan.create.mock.calls[0][0].data.dueAt).toBe(dueAt);
    });

    it('rejects a dueAt that is not in the future', async () => {
      await expect(
        service.create({ bookId, memberId, dueAt: new Date('2026-10-01') }),
      ).rejects.toBeInstanceOf(BadRequestException);
      expect(prisma.loan.create).not.toHaveBeenCalled();
    });
  });

  describe('findOne()', () => {
    it('throws NotFoundException when missing', async () => {
      prisma.loan.findUnique.mockResolvedValue(null);
      await expect(service.findOne(id)).rejects.toBeInstanceOf(
        NotFoundException,
      );
    });
  });

  describe('update()', () => {
    const existing = {
      id,
      borrowedAt: new Date('2026-10-10T00:00:00.000Z'),
      dueAt: new Date('2026-10-24T00:00:00.000Z'),
    };

    beforeEach(() => {
      prisma.loan.findUnique.mockResolvedValue(existing);
    });

    it('rejects dueAt before borrowedAt', async () => {
      await expect(
        service.update(id, { dueAt: new Date('2026-10-01T00:00:00.000Z') }),
      ).rejects.toBeInstanceOf(BadRequestException);
      expect(prisma.loan.update).not.toHaveBeenCalled();
    });

    it('rejects returnedAt before borrowedAt', async () => {
      await expect(
        service.update(id, {
          returnedAt: new Date('2026-10-09T00:00:00.000Z'),
        }),
      ).rejects.toBeInstanceOf(BadRequestException);
    });

    it('saves a valid returnedAt', async () => {
      const returnedAt = new Date('2026-10-12T00:00:00.000Z');
      await service.update(id, { returnedAt });

      expect(prisma.loan.update).toHaveBeenCalledWith(
        expect.objectContaining({ where: { id }, data: { returnedAt } }),
      );
    });

    it('throws NotFoundException for an unknown loan', async () => {
      prisma.loan.findUnique.mockResolvedValue(null);
      await expect(
        service.update(id, { returnedAt: now }),
      ).rejects.toBeInstanceOf(NotFoundException);
    });
  });
});
