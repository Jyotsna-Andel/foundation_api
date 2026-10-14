import { NotFoundException } from '@nestjs/common';
import {
  asPrismaService,
  createPrismaMock,
  type PrismaMock,
} from '../../test/utils/prisma-mock.js';
import { AuthorsService } from './authors.service.js';

describe('AuthorsService', () => {
  let prisma: PrismaMock;
  let service: AuthorsService;
  const id = '22222222-2222-4222-8222-222222222222';

  beforeEach(() => {
    prisma = createPrismaMock();
    service = new AuthorsService(asPrismaService(prisma));
  });

  it('create() saves name and optional bio', async () => {
    const dto = { name: 'Ursula K. Le Guin', bio: 'Author' };
    await service.create(dto);
    expect(prisma.author.create).toHaveBeenCalledWith({ data: dto });
  });

  it('findAll() orders by name', async () => {
    prisma.author.findMany.mockResolvedValue([]);
    await service.findAll();
    expect(prisma.author.findMany).toHaveBeenCalledWith({
      orderBy: { name: 'asc' },
    });
  });

  it('findOne() throws NotFoundException when missing', async () => {
    prisma.author.findUnique.mockResolvedValue(null);
    await expect(service.findOne(id)).rejects.toBeInstanceOf(NotFoundException);
  });

  it('update() and remove() target the given id', async () => {
    await service.update(id, { bio: 'Updated' });
    await service.remove(id);

    expect(prisma.author.update).toHaveBeenCalledWith({
      where: { id },
      data: { bio: 'Updated' },
    });
    expect(prisma.author.delete).toHaveBeenCalledWith({ where: { id } });
  });
});
