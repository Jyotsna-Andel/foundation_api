import { NotFoundException } from '@nestjs/common';
import {
  asPrismaService,
  createPrismaMock,
  type PrismaMock,
} from '../../test/utils/prisma-mock.js';
import { CategoriesService } from './categories.service.js';

describe('CategoriesService', () => {
  let prisma: PrismaMock;
  let service: CategoriesService;
  const id = '11111111-1111-4111-8111-111111111111';

  beforeEach(() => {
    prisma = createPrismaMock();
    service = new CategoriesService(asPrismaService(prisma));
  });

  it('create() saves the DTO', async () => {
    prisma.category.create.mockResolvedValue({ id, name: 'Fantasy' });

    await expect(service.create({ name: 'Fantasy' })).resolves.toEqual({
      id,
      name: 'Fantasy',
    });
    expect(prisma.category.create).toHaveBeenCalledWith({
      data: { name: 'Fantasy' },
    });
  });

  it('findAll() orders by name', async () => {
    prisma.category.findMany.mockResolvedValue([]);
    await service.findAll();
    expect(prisma.category.findMany).toHaveBeenCalledWith({
      orderBy: { name: 'asc' },
    });
  });

  it('findOne() returns the category', async () => {
    prisma.category.findUnique.mockResolvedValue({ id, name: 'Fantasy' });
    await expect(service.findOne(id)).resolves.toMatchObject({ id });
  });

  it('findOne() throws NotFoundException when missing', async () => {
    prisma.category.findUnique.mockResolvedValue(null);
    await expect(service.findOne(id)).rejects.toBeInstanceOf(NotFoundException);
  });

  it('update() and remove() target the given id', async () => {
    await service.update(id, { name: 'Sci-Fi' });
    await service.remove(id);

    expect(prisma.category.update).toHaveBeenCalledWith({
      where: { id },
      data: { name: 'Sci-Fi' },
    });
    expect(prisma.category.delete).toHaveBeenCalledWith({ where: { id } });
  });
});
