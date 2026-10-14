import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service.js';
import { CreateMemberDto } from './dto/create-member.dto.js';
import { UpdateMemberDto } from './dto/update-member.dto.js';

@Injectable()
export class MembersService {
  constructor(private readonly prisma: PrismaService) {}

  create(dto: CreateMemberDto) {
    return this.prisma.member.create({ data: dto });
  }

  findAll() {
    return this.prisma.member.findMany({ orderBy: { name: 'asc' } });
  }

  async findOne(id: string) {
    const member = await this.prisma.member.findUnique({ where: { id } });
    if (!member) {
      throw new NotFoundException(`Member ${id} not found`);
    }
    return member;
  }

  update(id: string, dto: UpdateMemberDto) {
    return this.prisma.member.update({ where: { id }, data: dto });
  }

  remove(id: string) {
    return this.prisma.member.delete({ where: { id } });
  }
}
