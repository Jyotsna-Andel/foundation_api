import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service.js';
import { CreateAuthorDto } from './dto/create-author.dto.js';
import { UpdateAuthorDto } from './dto/update-author.dto.js';

@Injectable()
export class AuthorsService {
  constructor(private readonly prisma: PrismaService) {}

  create(dto: CreateAuthorDto) {
    return this.prisma.author.create({ data: dto });
  }

  findAll() {
    return this.prisma.author.findMany({ orderBy: { name: 'asc' } });
  }

  async findOne(id: string) {
    const author = await this.prisma.author.findUnique({ where: { id } });
    if (!author) {
      throw new NotFoundException(`Author ${id} not found`);
    }
    return author;
  }

  update(id: string, dto: UpdateAuthorDto) {
    return this.prisma.author.update({ where: { id }, data: dto });
  }

  remove(id: string) {
    return this.prisma.author.delete({ where: { id } });
  }
}
