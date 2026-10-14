import { NotFoundException } from '@nestjs/common';
import {
  asPrismaService,
  createPrismaMock,
  type PrismaMock,
} from '../../test/utils/prisma-mock.js';
import { MembersService } from './members.service.js';

describe('MembersService', () => {
  let prisma: PrismaMock;
  let service: MembersService;
  const id = '33333333-3333-4333-8333-333333333333';

  beforeEach(() => {
    prisma = createPrismaMock();
    service = new MembersService(asPrismaService(prisma));
  });

  it('create() saves the DTO', async () => {
    const dto = { name: 'Jane', email: 'jane@example.com' };
    await service.create(dto);
    expect(prisma.member.create).toHaveBeenCalledWith({ data: dto });
  });

  it('findOne() throws NotFoundException when missing', async () => {
    prisma.member.findUnique.mockResolvedValue(null);
    await expect(service.findOne(id)).rejects.toBeInstanceOf(NotFoundException);
  });

  it('update() can change status', async () => {
    await service.update(id, { status: 'SUSPENDED' });
    expect(prisma.member.update).toHaveBeenCalledWith({
      where: { id },
      data: { status: 'SUSPENDED' },
    });
  });

  it('remove() targets the given id', async () => {
    await service.remove(id);
    expect(prisma.member.delete).toHaveBeenCalledWith({ where: { id } });
  });
});
