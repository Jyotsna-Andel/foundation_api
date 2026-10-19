import { zodResolver } from '@hookform/resolvers/zod';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { booksApi, loansApi, membersApi } from '../../api/hooks';
import type { Loan } from '../../api/types';
import { ConfirmDelete } from '../../components/ConfirmDelete';
import { Field, FormFooter, Input, Select } from '../../components/form';
import { Modal } from '../../components/Modal';
import { formatDate } from '../../lib/format';
import {
  Badge,
  Button,
  DataTable,
  ErrorBanner,
  PageHeader,
  Td,
} from '../../components/ui';

/** `<input type="date">` gives "YYYY-MM-DD"; the API wants an ISO date-time (end of that day, local time). */
const endOfDayIso = (date: string) =>
  new Date(`${date}T23:59:59`).toISOString();
const toDateInput = (iso: string) => {
  const d = new Date(iso);
  const pad = (n: number) => String(n).padStart(2, '0');
  return `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())}`;
};
const today = () => toDateInput(new Date().toISOString());

function loanStatus(loan: Loan) {
  if (loan.returnedAt) return <Badge tone="slate">Returned</Badge>;
  if (new Date(loan.dueAt) < new Date())
    return <Badge tone="red">Overdue</Badge>;
  return <Badge tone="green">On loan</Badge>;
}

// --- New loan -------------------------------------------------------------

const createSchema = z.object({
  bookId: z.string().min(1, 'Choose a book'),
  memberId: z.string().min(1, 'Choose a member'),
  dueAt: z
    .string()
    .refine((v) => v === '' || v > today(), 'Due date must be after today'),
});
type CreateValues = z.infer<typeof createSchema>;

function NewLoanForm({ onDone }: { onDone: () => void }) {
  const create = loansApi.useCreate();
  const books = booksApi.useList();
  const members = membersApi.useList();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<CreateValues>({
    resolver: zodResolver(createSchema),
    defaultValues: { bookId: '', memberId: '', dueAt: '' },
  });

  const onSubmit = ({ bookId, memberId, dueAt }: CreateValues) =>
    create.mutate(
      { bookId, memberId, dueAt: dueAt ? endOfDayIso(dueAt) : undefined },
      { onSuccess: onDone },
    );

  return (
    <form onSubmit={handleSubmit(onSubmit)} noValidate>
      <Field label="Book" error={errors.bookId}>
        <Select
          autoFocus
          aria-invalid={!!errors.bookId}
          {...register('bookId')}
        >
          <option value="">Choose…</option>
          {books.data?.map((b) => (
            <option key={b.id} value={b.id}>
              {b.title} ({b.availableCopies}/{b.totalCopies} available)
            </option>
          ))}
        </Select>
      </Field>
      <Field label="Member" error={errors.memberId}>
        <Select aria-invalid={!!errors.memberId} {...register('memberId')}>
          <option value="">Choose…</option>
          {members.data?.map((m) => (
            <option key={m.id} value={m.id}>
              {m.name} ({m.email})
              {m.status === 'SUSPENDED' ? ' · suspended' : ''}
            </option>
          ))}
        </Select>
      </Field>
      <Field
        label="Due date"
        error={errors.dueAt}
        hint="Leave empty for 14 days from today"
      >
        <Input
          type="date"
          min={today()}
          aria-invalid={!!errors.dueAt}
          {...register('dueAt')}
        />
      </Field>
      <FormFooter
        serverError={create.error}
        isSubmitting={create.isPending}
        onCancel={onDone}
        submitLabel="Create loan"
      />
    </form>
  );
}

// --- Change due date --------------------------------------------------------

const editSchema = z.object({ dueAt: z.string().min(1, 'Choose a due date') });
type EditValues = z.infer<typeof editSchema>;

function EditDueDateForm({ loan, onDone }: { loan: Loan; onDone: () => void }) {
  const update = loansApi.useUpdate();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<EditValues>({
    resolver: zodResolver(editSchema),
    defaultValues: { dueAt: toDateInput(loan.dueAt) },
  });

  return (
    <form
      onSubmit={handleSubmit(({ dueAt }) =>
        update.mutate(
          { id: loan.id, input: { dueAt: endOfDayIso(dueAt) } },
          { onSuccess: onDone },
        ),
      )}
      noValidate
    >
      <p className="mb-4 text-sm text-slate-600">
        <strong>{loan.book.title}</strong> borrowed by {loan.member.name} on{' '}
        {formatDate(loan.borrowedAt)}.
      </p>
      <Field label="Due date" error={errors.dueAt}>
        <Input
          type="date"
          autoFocus
          aria-invalid={!!errors.dueAt}
          {...register('dueAt')}
        />
      </Field>
      <FormFooter
        serverError={update.error}
        isSubmitting={update.isPending}
        onCancel={onDone}
      />
    </form>
  );
}

// --- Page -----------------------------------------------------------------

export function LoansPage() {
  const { data = [], isLoading, error } = loansApi.useList();
  const update = loansApi.useUpdate();
  const remove = loansApi.useRemove();
  const [creating, setCreating] = useState(false);
  const [editing, setEditing] = useState<Loan | null>(null);
  const [deleting, setDeleting] = useState<Loan | null>(null);

  return (
    <>
      <PageHeader
        title="Loans"
        description="Who has which book, and until when."
        action={<Button onClick={() => setCreating(true)}>New loan</Button>}
      />

      <ErrorBanner error={update.error} />

      <DataTable
        headers={[
          'Book',
          'Member',
          'Borrowed',
          'Due',
          'Returned',
          'Status',
          '',
        ]}
        isLoading={isLoading}
        error={error}
        isEmpty={data.length === 0}
        emptyText="No loans yet."
      >
        {data.map((l) => (
          <tr key={l.id}>
            <Td className="font-medium">{l.book.title}</Td>
            <Td className="text-slate-600">{l.member.name}</Td>
            <Td className="text-slate-500">{formatDate(l.borrowedAt)}</Td>
            <Td className="text-slate-500">{formatDate(l.dueAt)}</Td>
            <Td className="text-slate-500">{formatDate(l.returnedAt)}</Td>
            <Td>{loanStatus(l)}</Td>
            <Td className="text-right whitespace-nowrap">
              {!l.returnedAt && (
                <>
                  <Button
                    variant="ghost"
                    disabled={update.isPending}
                    onClick={() =>
                      update.mutate({
                        id: l.id,
                        input: { returnedAt: new Date().toISOString() },
                      })
                    }
                  >
                    Mark returned
                  </Button>
                  <Button variant="ghost" onClick={() => setEditing(l)}>
                    Edit
                  </Button>
                </>
              )}
              <Button variant="ghost" onClick={() => setDeleting(l)}>
                Delete
              </Button>
            </Td>
          </tr>
        ))}
      </DataTable>

      <Modal
        title="New loan"
        open={creating}
        onClose={() => setCreating(false)}
      >
        <NewLoanForm onDone={() => setCreating(false)} />
      </Modal>

      <Modal
        title="Change due date"
        open={editing !== null}
        onClose={() => setEditing(null)}
      >
        {editing && (
          <EditDueDateForm loan={editing} onDone={() => setEditing(null)} />
        )}
      </Modal>

      <ConfirmDelete
        target={
          deleting && {
            id: deleting.id,
            label: `loan of "${deleting.book.title}" to ${deleting.member.name}`,
          }
        }
        onClose={() => setDeleting(null)}
        mutation={remove}
      />
    </>
  );
}
