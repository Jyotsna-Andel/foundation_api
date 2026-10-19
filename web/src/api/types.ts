// Response shapes returned by the API (dates arrive as ISO strings in JSON).

interface Timestamps {
  createdAt: string;
  updatedAt: string;
}

export interface Category extends Timestamps {
  id: string;
  name: string;
}

export interface Author extends Timestamps {
  id: string;
  name: string;
  bio: string | null;
}

export type MemberStatus = 'ACTIVE' | 'SUSPENDED';

export interface Member extends Timestamps {
  id: string;
  name: string;
  email: string;
  status: MemberStatus;
}

export interface Book extends Timestamps {
  id: string;
  isbn: string;
  title: string;
  publishedYear: number | null;
  totalCopies: number;
  availableCopies: number;
  categoryId: string;
  category: { id: string; name: string };
  authors: { id: string; name: string }[];
}

export interface Loan {
  id: string;
  bookId: string;
  memberId: string;
  borrowedAt: string;
  dueAt: string;
  returnedAt: string | null;
  /** Prisma Decimal, serialised as a string, e.g. "0" or "12.50" */
  lateFee: string;
  book: { id: string; title: string; isbn: string };
  member: { id: string; name: string; email: string };
}

// Request bodies (mirror the API's Create/Update DTOs).

export interface CategoryInput {
  name: string;
}

export interface AuthorInput {
  name: string;
  bio?: string;
}

export interface MemberInput {
  name: string;
  email: string;
  status?: MemberStatus;
}

export interface BookInput {
  isbn: string;
  title: string;
  publishedYear?: number;
  totalCopies?: number;
  categoryId: string;
  authorIds?: string[];
}

export interface CreateLoanInput {
  bookId: string;
  memberId: string;
  dueAt?: string;
}

export interface UpdateLoanInput {
  dueAt?: string;
  returnedAt?: string;
}
