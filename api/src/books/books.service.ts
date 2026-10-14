import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service.js';
import { CreateBookDto } from './dto/create-book.dto.js';
import { UpdateBookDto } from './dto/update-book.dto.js';

const bookInclude = {
  category: { select: { id: true, name: true } },
  authors: { select: { id: true, name: true } },
} as const;

@Injectable()
export class BooksService {
  constructor(private readonly prisma: PrismaService) {}

  create(dto: CreateBookDto) {
    const { categoryId, authorIds = [], totalCopies = 1, ...fields } = dto;
    return this.prisma.book.create({
      data: {
        ...fields,
        totalCopies,
        availableCopies: totalCopies,
        category: { connect: { id: categoryId } },
        authors: { connect: authorIds.map((id) => ({ id })) },
      },
      include: bookInclude,
    });
  }

  findAll() {
    return this.prisma.book.findMany({
      orderBy: { title: 'asc' },
      include: bookInclude,
    });
  }

  async findOne(id: string) {
    const book = await this.prisma.book.findUnique({
      where: { id },
      include: bookInclude,
    });
    if (!book) {
      throw new NotFoundException(`Book ${id} not found`);
    }
    return book;
  }

  update(id: string, dto: UpdateBookDto) {
    const { categoryId, authorIds, totalCopies, ...fields } = dto;

    return this.prisma.$transaction(async (tx) => {
      const current = await tx.book.findUnique({ where: { id } });
      if (!current) {
        throw new NotFoundException(`Book ${id} not found`);
      }

      // Changing totalCopies shifts availableCopies by the same amount,
      // so copies currently on loan stay accounted for.
      let availableCopies: number | undefined;
      if (totalCopies !== undefined) {
        const onLoan = current.totalCopies - current.availableCopies;
        if (totalCopies < onLoan) {
          throw new ConflictException(
            `Cannot set totalCopies to ${totalCopies}: ${onLoan} copies are on loan`,
          );
        }
        availableCopies = totalCopies - onLoan;
      }

      return tx.book.update({
        where: { id },
        data: {
          ...fields,
          ...(totalCopies !== undefined && { totalCopies, availableCopies }),
          ...(categoryId && { category: { connect: { id: categoryId } } }),
          ...(authorIds && {
            authors: { set: authorIds.map((authorId) => ({ id: authorId })) },
          }),
        },
        include: bookInclude,
      });
    });
  }

  remove(id: string) {
    return this.prisma.book.delete({ where: { id } });
  }
}
