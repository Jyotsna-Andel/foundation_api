import { zodResolver } from '@hookform/resolvers/zod';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { categoriesApi } from '../../api/hooks';
import type { Category } from '../../api/types';
import { ConfirmDelete } from '../../components/ConfirmDelete';
import { Field, FormFooter, Input } from '../../components/form';
import { Modal } from '../../components/Modal';
import { formatDate } from '../../lib/format';
import { Button, DataTable, PageHeader, Td } from '../../components/ui';

// Mirrors CreateCategoryDto: trimmed, required, max 60 characters.
const schema = z.object({
  name: z
    .string()
    .trim()
    .min(1, 'Name is required')
    .max(60, 'Max 60 characters'),
});
type FormValues = z.infer<typeof schema>;

function CategoryForm({
  category,
  onDone,
}: {
  category?: Category;
  onDone: () => void;
}) {
  const create = categoriesApi.useCreate();
  const update = categoriesApi.useUpdate();
  const mutation = category ? update : create;

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormValues>({
    resolver: zodResolver(schema),
    defaultValues: { name: category?.name ?? '' },
  });

  const onSubmit = (values: FormValues) =>
    category
      ? update.mutate({ id: category.id, input: values }, { onSuccess: onDone })
      : create.mutate(values, { onSuccess: onDone });

  return (
    <form onSubmit={handleSubmit(onSubmit)} noValidate>
      <Field label="Name" error={errors.name}>
        <Input autoFocus aria-invalid={!!errors.name} {...register('name')} />
      </Field>
      <FormFooter
        serverError={mutation.error}
        isSubmitting={mutation.isPending}
        onCancel={onDone}
      />
    </form>
  );
}

export function CategoriesPage() {
  const { data = [], isLoading, error } = categoriesApi.useList();
  const remove = categoriesApi.useRemove();
  const [editing, setEditing] = useState<Category | 'new' | null>(null);
  const [deleting, setDeleting] = useState<Category | null>(null);

  return (
    <>
      <PageHeader
        title="Categories"
        description="Genres used to group books."
        action={<Button onClick={() => setEditing('new')}>New category</Button>}
      />

      <DataTable
        headers={['Name', 'Created', '']}
        isLoading={isLoading}
        error={error}
        isEmpty={data.length === 0}
        emptyText="No categories yet."
      >
        {data.map((c) => (
          <tr key={c.id}>
            <Td className="font-medium">{c.name}</Td>
            <Td className="text-slate-500">{formatDate(c.createdAt)}</Td>
            <Td className="text-right whitespace-nowrap">
              <Button variant="ghost" onClick={() => setEditing(c)}>
                Edit
              </Button>
              <Button variant="ghost" onClick={() => setDeleting(c)}>
                Delete
              </Button>
            </Td>
          </tr>
        ))}
      </DataTable>

      <Modal
        title={editing === 'new' ? 'New category' : 'Edit category'}
        open={editing !== null}
        onClose={() => setEditing(null)}
      >
        <CategoryForm
          category={editing === 'new' || editing === null ? undefined : editing}
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
