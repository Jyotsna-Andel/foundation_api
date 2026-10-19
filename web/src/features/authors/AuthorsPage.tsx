import { zodResolver } from '@hookform/resolvers/zod';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { authorsApi } from '../../api/hooks';
import type { Author } from '../../api/types';
import { ConfirmDelete } from '../../components/ConfirmDelete';
import { Field, FormFooter, Input, TextArea } from '../../components/form';
import { Modal } from '../../components/Modal';
import { Button, DataTable, PageHeader, Td } from '../../components/ui';

// Mirrors CreateAuthorDto.
const schema = z.object({
  name: z
    .string()
    .trim()
    .min(1, 'Name is required')
    .max(120, 'Max 120 characters'),
  bio: z.string().trim().max(2000, 'Max 2000 characters'),
});
type FormValues = z.infer<typeof schema>;

function AuthorForm({
  author,
  onDone,
}: {
  author?: Author;
  onDone: () => void;
}) {
  const create = authorsApi.useCreate();
  const update = authorsApi.useUpdate();
  const mutation = author ? update : create;

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormValues>({
    resolver: zodResolver(schema),
    defaultValues: { name: author?.name ?? '', bio: author?.bio ?? '' },
  });

  const onSubmit = ({ name, bio }: FormValues) => {
    const input = { name, bio: bio || undefined };
    return author
      ? update.mutate({ id: author.id, input }, { onSuccess: onDone })
      : create.mutate(input, { onSuccess: onDone });
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} noValidate>
      <Field label="Name" error={errors.name}>
        <Input autoFocus aria-invalid={!!errors.name} {...register('name')} />
      </Field>
      <Field label="Bio (optional)" error={errors.bio}>
        <TextArea aria-invalid={!!errors.bio} {...register('bio')} />
      </Field>
      <FormFooter
        serverError={mutation.error}
        isSubmitting={mutation.isPending}
        onCancel={onDone}
      />
    </form>
  );
}

export function AuthorsPage() {
  const { data = [], isLoading, error } = authorsApi.useList();
  const remove = authorsApi.useRemove();
  const [editing, setEditing] = useState<Author | 'new' | null>(null);
  const [deleting, setDeleting] = useState<Author | null>(null);

  return (
    <>
      <PageHeader
        title="Authors"
        action={<Button onClick={() => setEditing('new')}>New author</Button>}
      />

      <DataTable
        headers={['Name', 'Bio', '']}
        isLoading={isLoading}
        error={error}
        isEmpty={data.length === 0}
        emptyText="No authors yet."
      >
        {data.map((a) => (
          <tr key={a.id}>
            <Td className="font-medium whitespace-nowrap">{a.name}</Td>
            <Td className="max-w-md truncate text-slate-500">{a.bio ?? '—'}</Td>
            <Td className="text-right whitespace-nowrap">
              <Button variant="ghost" onClick={() => setEditing(a)}>
                Edit
              </Button>
              <Button variant="ghost" onClick={() => setDeleting(a)}>
                Delete
              </Button>
            </Td>
          </tr>
        ))}
      </DataTable>

      <Modal
        title={editing === 'new' ? 'New author' : 'Edit author'}
        open={editing !== null}
        onClose={() => setEditing(null)}
      >
        <AuthorForm
          author={editing === 'new' || editing === null ? undefined : editing}
          onDone={() => setEditing(null)}
        />
      </Modal>

      <ConfirmDelete
        target={deleting && { id: deleting.id, label: deleting.name }}
        onClose={() => setDeleting(null)}
        mutation={remove}
      />
    </>
  );
}
