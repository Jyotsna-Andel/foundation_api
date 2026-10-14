import { ConflictException, NotFoundException } from '@nestjs/common';
import {
  asPrismaService,
  createPrismaMock,
  type PrismaMock,
} from '../../test/utils/prisma-mock.js';
import { BooksService } from './books.service.js';

describe('BooksService', () => {
  let prisma: PrismaMock;
  let service: BooksService;
  const id = '44444444-4444-4444-8444-444444444444';
  const categoryId = '55555555-5555-4555-8555-555555555555';
  const authorA = '66666666-6666-4666-8666-666666666666';
  const authorB = '77777777-7777-4777-8777-777777777777';

  beforeEach(() => {
    prisma = createPrismaMock();
    service = new BooksService(asPrismaService(prisma));
  });

  describe('create()', () => {
    it('sets availableCopies = totalCopies and connects relations', async () => {
      await service.create({
        isbn: '9780441478125',
        title: 'The Left Hand of Darkness',
        totalCopies: 3,
        categoryId,
        authorIds: [authorA, authorB],
      });

      const { data } = prisma.book.create.mock.calls[0][0];
      expect(data).toMatchObject({
        isbn: '9780441478125',
        title: 'The Left Hand of Darkness',
        totalCopies: 3,
        availableCopies: 3,
        category: { connect: { id: categoryId } },
        authors: { connect: [{ id: authorA }, { id: authorB }] },
      });
    });

    it('defaults to 1 copy and no authors', async () => {
      await service.create({ isbn: '9780441478125', title: 'X', categoryId });

      const { data } = prisma.book.create.mock.calls[0][0];
      expect(data.totalCopies).toBe(1);
      expect(data.availableCopies).toBe(1);
      expect(data.authors).toEqual({ connect: [] });
    });
  });

  describe('findOne()', () => {
    it('throws NotFoundException when missing', async () => {
      prisma.book.findUnique.mockResolvedValue(null);
      await expect(service.findOne(id)).rejects.toBeInstanceOf(
        NotFoundException,
      );
    });
  });

  describe('update()', () => {
    // 3 copies in total, 1 on the shelf -> 2 on loan
    const current = { id, totalCopies: 3, availableCopies: 1 };

    it('throws NotFoundException when the book does not exist', async () => {
      prisma.book.findUnique.mockResolvedValue(null);
      await expect(service.update(id, { title: 'X' })).rejects.toBeInstanceOf(
        NotFoundException,
      );
      expect(prisma.book.update).not.toHaveBeenCalled();
    });

    it('shifts availableCopies with totalCopies, keeping on-loan copies', async () => {
      prisma.book.findUnique.mockResolvedValue(current);

      await service.update(id, { totalCopies: 5 });

      const { data } = prisma.book.update.mock.calls[0][0];
      expect(data).toMatchObject({ totalCopies: 5, availableCopies: 3 });
    });

    it('allows shrinking down to exactly the copies on loan', async () => {
      prisma.book.findUnique.mockResolvedValue(current);

      await service.update(id, { totalCopies: 2 });

      const { data } = prisma.book.update.mock.calls[0][0];
      expect(data).toMatchObject({ totalCopies: 2, availableCopies: 0 });
    });

    it('rejects totalCopies below the copies on loan', async () => {
      prisma.book.findUnique.mockResolvedValue(current);

      await expect(
        service.update(id, { totalCopies: 1 }),
      ).rejects.toBeInstanceOf(ConflictException);
      expect(prisma.book.update).not.toHaveBeenCalled();
    });

    it('replaces authors with set and reconnects the category', async () => {
      prisma.book.findUnique.mockResolvedValue(current);

      await service.update(id, { authorIds: [authorB], categoryId });

      const { data } = prisma.book.update.mock.calls[0][0];
      expect(data.authors).toEqual({ set: [{ id: authorB }] });
      expect(data.category).toEqual({ connect: { id: categoryId } });
    });

    it('leaves copies and relations untouched when not provided', async () => {
      prisma.book.findUnique.mockResolvedValue(current);

      await service.update(id, { title: 'New title' });

      const { data } = prisma.book.update.mock.calls[0][0];
      expect(data).toEqual({ title: 'New title' });
    });
  });
});
