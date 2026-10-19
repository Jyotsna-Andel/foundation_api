import { zodResolver } from '@hookform/resolvers/zod';
import { useMemo, useState } from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { authorsApi, booksApi, categoriesApi } from '../../api/hooks';
import type { Book, BookInput } from '../../api/types';
import { ConfirmDelete } from '../../components/ConfirmDelete';
import { Field, FormFooter, Input, Select } from '../../components/form';
import { Modal } from '../../components/Modal';
import { Badge, Button, DataTable, PageHeader, Td } from '../../components/ui';

const currentYear = new Date().getFullYear();

// Mirrors CreateBookDto. Numbers are kept as strings in the form (that's what
// inputs produce) and converted in toInput(). The API does the ISBN checksum.
const schema = z.object({
  isbn: z
    .string()
    .trim()
    .min(10, 'ISBN-10 or ISBN-13, e.g. 978-0-441-47812-5')
    .max(17, 'Too long for an ISBN'),
  title: z
    .string()
    .trim()
    .min(1, 'Title is required')
    .max(200, 'Max 200 characters'),
  publishedYear: z
    .string()
    .trim()
    .refine(
      (v) => v === '' || (/^\d{4}$/.test(v) && Number(v) <= currentYear),
      `A 4-digit year, not after ${currentYear}`,
    ),
  totalCopies: z
    .string()
    .trim()
    .refine(
      (v) => /^\d+$/.test(v) && Number(v) >= 1 && Number(v) <= 1000,
      'A whole number from 1 to 1000',
    ),
  categoryId: z.string().min(1, 'Choose a category'),
  authorIds: z.array(z.string()),
});
type FormValues = z.infer<typeof schema>;

const toInput = (v: FormValues): BookInput => ({
  isbn: v.isbn,
  title: v.title,
  publishedYear: v.publishedYear ? Number(v.publishedYear) : undefined,
  totalCopies: Number(v.totalCopies),
  categoryId: v.categoryId,
  authorIds: v.authorIds,
});

function BookForm({ book, onDone }: { book?: Book; onDone: () => void }) {
  const create = booksApi.useCreate();
  const update = booksApi.useUpdate();
  const mutation = book ? update : create;
  const categories = categoriesApi.useList();
  const authors = authorsApi.useList();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormValues>({
    resolver: zodResolver(schema),
    defaultValues: {
      isbn: book?.isbn ?? '',
      title: book?.title ?? '',
      publishedYear: book?.publishedYear?.toString() ?? '',
      totalCopies: book?.totalCopies.toString() ?? '1',
      categoryId: book?.categoryId ?? '',
      authorIds: book?.authors.map((a) => a.id) ?? [],
    },
  });

  const onSubmit = (values: FormValues) => {
    const input = toInput(values);
    return book
      ? update.mutate({ id: book.id, input }, { onSuccess: onDone })
      : create.mutate(input, { onSuccess: onDone });
  };

  const onLoan = book ? book.totalCopies - book.availableCopies : 0;

  return (
    <form onSubmit={handleSubmit(onSubmit)} noValidate>
      <Field label="Title" error={errors.title}>
        <Input autoFocus aria-invalid={!!errors.title} {...register('title')} />
      </Field>
      <div className="grid grid-cols-2 gap-x-4">
        <Field label="ISBN" error={errors.isbn}>
          <Input aria-invalid={!!errors.isbn} {...register('isbn')} />
        </Field>
        <Field label="Published year" error={errors.publishedYear}>
          <Input
            inputMode="numeric"
            placeholder="optional"
            aria-invalid={!!errors.publishedYear}
            {...register('publishedYear')}
          />
        </Field>
      </div>
      <div className="grid grid-cols-2 gap-x-4">
        <Field
          label="Total copies"
          error={errors.totalCopies}
          hint={onLoan > 0 ? `${onLoan} currently on loan` : undefined}
        >
          <Input
            inputMode="numeric"
            aria-invalid={!!errors.totalCopies}
            {...register('totalCopies')}
          />
        </Field>
        <Field label="Category" error={errors.categoryId}>
          <Select
            aria-invalid={!!errors.categoryId}
            {...register('categoryId')}
          >
            <option value="">Choose…</option>
            {categories.data?.map((c) => (
              <option key={c.id} value={c.id}>
                {c.name}
              </option>
            ))}
          </Select>
        </Field>
      </div>

      <fieldset className="mb-4">
        <legend className="text-sm font-medium text-slate-700">Authors</legend>
        <div className="mt-1 max-h-40 overflow-y-auto rounded-md border border-slate-300 p-2">
          {authors.data?.length ? (
            authors.data.map((a) => (
              <label
                key={a.id}
                className="flex items-center gap-2 py-0.5 text-sm"
              >
                <input
                  type="checkbox"
                  value={a.id}
                  {...register('authorIds')}
                />
                {a.name}
              </label>
            ))
          ) : (
            <p className="text-sm text-slate-500">
              No authors yet. Add some first.
            </p>
          )}
        </div>
      </fieldset>

      <FormFooter
        serverError={mutation.error}
        isSubmitting={mutation.isPending}
        onCancel={onDone}
      />
    </form>
  );
}

export function BooksPage() {
  const { data = [], isLoading, error } = booksApi.useList();
  const remove = booksApi.useRemove();
  const [editing, setEditing] = useState<Book | 'new' | null>(null);
  const [deleting, setDeleting] = useState<Book | null>(null);
  const [search, setSearch] = useState('');

  const filtered = useMemo(() => {
    const q = search.trim().toLowerCase();
    if (!q) return data;
    return data.filter(
      (b) =>
        b.title.toLowerCase().includes(q) ||
        b.isbn.includes(q) ||
        b.category.name.toLowerCase().includes(q) ||
        b.authors.some((a) => a.name.toLowerCase().includes(q)),
    );
  }, [data, search]);

  return (
    <>
      <PageHeader
        title="Books"
        description="The catalogue, with copies available to borrow."
        action={<Button onClick={() => setEditing('new')}>New book</Button>}
      />

      <input
        type="search"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        placeholder="Search title, author, category or ISBN…"
        className="mb-4 w-full max-w-sm rounded-md border border-slate-300 px-3 py-2 text-sm"
      />

      <DataTable
        headers={['Title', 'Authors', 'Category', 'ISBN', 'Available', '']}
        isLoading={isLoading}
        error={error}
        isEmpty={filtered.length === 0}
        emptyText={
          data.length === 0 ? 'No books yet.' : 'No books match your search.'
        }
      >
        {filtered.map((b) => (
          <tr key={b.id}>
            <Td className="font-medium">
              {b.title}
              {b.publishedYear && (
                <span className="ml-1 font-normal text-slate-400">
                  ({b.publishedYear})
                </span>
              )}
            </Td>
            <Td className="text-slate-600">
              {b.authors.map((a) => a.name).join(', ') || '—'}
            </Td>
            <Td className="text-slate-600">{b.category.name}</Td>
            <Td className="font-mono text-xs text-slate-500">{b.isbn}</Td>
            <Td>
              <Badge tone={b.availableCopies > 0 ? 'green' : 'amber'}>
                {b.availableCopies} / {b.totalCopies}
              </Badge>
            </Td>
            <Td className="text-right whitespace-nowrap">
              <Button variant="ghost" onClick={() => setEditing(b)}>
                Edit
              </Button>
              <Button variant="ghost" onClick={() => setDeleting(b)}>
                Delete
              </Button>
            </Td>
          </tr>
        ))}
      </DataTable>

      <Modal
        title={editing === 'new' ? 'New book' : 'Edit book'}
        open={editing !== null}
        onClose={() => setEditing(null)}
      >
        <BookForm
          book={editing === 'new' || editing === null ? undefined : editing}
          onDone={() => setEditing(null)}
        />
      </Modal>

      <ConfirmDelete
        target={deleting && { id: deleting.id, label: deleting.title }}
        onClose={() => setDeleting(null)}
        mutation={remove}
      />
    </>
  );
}
