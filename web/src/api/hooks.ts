import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { apiFetch } from './client';
import type {
  Author,
  AuthorInput,
  Book,
  BookInput,
  Category,
  CategoryInput,
  CreateLoanInput,
  Loan,
  Member,
  MemberInput,
  UpdateLoanInput,
} from './types';

/**
 * Builds the four TanStack Query hooks for one CRUD resource.
 * `key` is the query-cache key; mutations invalidate it (and any `affects` keys)
 * so lists refetch after a change.
 */
function createResourceHooks<
  T,
  CreateInput,
  UpdateInput = Partial<CreateInput>,
>(key: string, affects: string[] = []) {
  const path = `/${key}`;

  const useInvalidate = () => {
    const queryClient = useQueryClient();
    return () =>
      Promise.all(
        [key, ...affects].map((k) =>
          queryClient.invalidateQueries({ queryKey: [k] }),
        ),
      );
  };

  return {
    useList: () =>
      useQuery({ queryKey: [key], queryFn: () => apiFetch<T[]>(path) }),

    useCreate: () => {
      const invalidate = useInvalidate();
      return useMutation({
        mutationFn: (input: CreateInput) =>
          apiFetch<T>(path, { method: 'POST', body: input }),
        onSuccess: invalidate,
      });
    },

    useUpdate: () => {
      const invalidate = useInvalidate();
      return useMutation({
        mutationFn: ({ id, input }: { id: string; input: UpdateInput }) =>
          apiFetch<T>(`${path}/${id}`, { method: 'PATCH', body: input }),
        onSuccess: invalidate,
      });
    },

    useRemove: () => {
      const invalidate = useInvalidate();
      return useMutation({
        mutationFn: (id: string) =>
          apiFetch<void>(`${path}/${id}`, { method: 'DELETE' }),
        onSuccess: invalidate,
      });
    },
  };
}

// Renaming a category/author changes how books display, so refresh books too.
export const categoriesApi = createResourceHooks<Category, CategoryInput>(
  'categories',
  ['books'],
);
export const authorsApi = createResourceHooks<Author, AuthorInput>('authors', [
  'books',
]);
export const membersApi = createResourceHooks<Member, MemberInput>('members', [
  'loans',
]);
export const booksApi = createResourceHooks<Book, BookInput>('books', [
  'loans',
]);
export const loansApi = createResourceHooks<
  Loan,
  CreateLoanInput,
  UpdateLoanInput
>('loans');
