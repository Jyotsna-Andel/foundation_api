import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service.js';
import { CreateLoanDto } from './dto/create-loan.dto.js';
import { UpdateLoanDto } from './dto/update-loan.dto.js';

const LOAN_PERIOD_DAYS = 14;
const DAY_MS = 24 * 60 * 60 * 1000;

const loanInclude = {
  book: { select: { id: true, title: true, isbn: true } },
  member: { select: { id: true, name: true, email: true } },
} as const;

// CRUD only. Stock changes (availableCopies) and borrowing rules
// arrive with the borrow/return endpoints in Phase 4.
@Injectable()
export class LoansService {
  constructor(private readonly prisma: PrismaService) {}

  async create(dto: CreateLoanDto) {
    const dueAt = dto.dueAt ?? new Date(Date.now() + LOAN_PERIOD_DAYS * DAY_MS);
    if (dueAt.getTime() <= Date.now()) {
      throw new BadRequestException('dueAt must be in the future');
    }
    return this.prisma.loan.create({
      data: {
        dueAt,
        book: { connect: { id: dto.bookId } },
        member: { connect: { id: dto.memberId } },
      },
      include: loanInclude,
    });
  }

  findAll() {
    return this.prisma.loan.findMany({
      orderBy: { borrowedAt: 'desc' },
      include: loanInclude,
    });
  }

  async findOne(id: string) {
    const loan = await this.prisma.loan.findUnique({
      where: { id },
      include: loanInclude,
    });
    if (!loan) {
      throw new NotFoundException(`Loan ${id} not found`);
    }
    return loan;
  }

  async update(id: string, dto: UpdateLoanDto) {
    const loan = await this.findOne(id);
    const dueAt = dto.dueAt ?? loan.dueAt;
    if (dueAt <= loan.borrowedAt) {
      throw new BadRequestException('dueAt must be after borrowedAt');
    }
    if (dto.returnedAt && dto.returnedAt < loan.borrowedAt) {
      throw new BadRequestException('returnedAt cannot be before borrowedAt');
    }
    return this.prisma.loan.update({
      where: { id },
      data: dto,
      include: loanInclude,
    });
  }

  remove(id: string) {
    return this.prisma.loan.delete({ where: { id } });
  }
}
