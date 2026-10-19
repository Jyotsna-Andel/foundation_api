import { zodResolver } from '@hookform/resolvers/zod';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { membersApi } from '../../api/hooks';
import type { Member } from '../../api/types';
import { ConfirmDelete } from '../../components/ConfirmDelete';
import { Field, FormFooter, Input, Select } from '../../components/form';
import { Modal } from '../../components/Modal';
import { Badge, Button, DataTable, PageHeader, Td } from '../../components/ui';

// Mirrors CreateMemberDto (email trimmed + lowercased like the API does).
const schema = z.object({
  name: z
    .string()
    .trim()
    .min(1, 'Name is required')
    .max(120, 'Max 120 characters'),
  email: z
    .string()
    .trim()
    .toLowerCase()
    .pipe(z.email('Enter a valid email').max(255)),
  status: z.enum(['ACTIVE', 'SUSPENDED']),
});
type FormValues = z.infer<typeof schema>;

function MemberForm({
  member,
  onDone,
}: {
  member?: Member;
  onDone: () => void;
}) {
  const create = membersApi.useCreate();
  const update = membersApi.useUpdate();
  const mutation = member ? update : create;

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormValues>({
    resolver: zodResolver(schema),
    defaultValues: {
      name: member?.name ?? '',
      email: member?.email ?? '',
      status: member?.status ?? 'ACTIVE',
    },
  });

  const onSubmit = (values: FormValues) =>
    member
      ? update.mutate({ id: member.id, input: values }, { onSuccess: onDone })
      : create.mutate(values, { onSuccess: onDone });

  return (
    <form onSubmit={handleSubmit(onSubmit)} noValidate>
      <Field label="Name" error={errors.name}>
        <Input autoFocus aria-invalid={!!errors.name} {...register('name')} />
      </Field>
      <Field label="Email" error={errors.email}>
        <Input
          type="email"
          aria-invalid={!!errors.email}
          {...register('email')}
        />
      </Field>
      <Field label="Status" error={errors.status}>
        <Select {...register('status')}>
          <option value="ACTIVE">Active</option>
          <option value="SUSPENDED">Suspended</option>
        </Select>
      </Field>
      <FormFooter
        serverError={mutation.error}
        isSubmitting={mutation.isPending}
        onCancel={onDone}
      />
    </form>
  );
}

export function MembersPage() {
  const { data = [], isLoading, error } = membersApi.useList();
  const remove = membersApi.useRemove();
  const [editing, setEditing] = useState<Member | 'new' | null>(null);
  const [deleting, setDeleting] = useState<Member | null>(null);

  return (
    <>
      <PageHeader
        title="Members"
        action={<Button onClick={() => setEditing('new')}>New member</Button>}
      />

      <DataTable
        headers={['Name', 'Email', 'Status', '']}
        isLoading={isLoading}
        error={error}
        isEmpty={data.length === 0}
        emptyText="No members yet."
      >
        {data.map((m) => (
          <tr key={m.id}>
            <Td className="font-medium">{m.name}</Td>
            <Td className="text-slate-600">{m.email}</Td>
            <Td>
              <Badge tone={m.status === 'ACTIVE' ? 'green' : 'red'}>
                {m.status === 'ACTIVE' ? 'Active' : 'Suspended'}
              </Badge>
            </Td>
            <Td className="text-right whitespace-nowrap">
              <Button variant="ghost" onClick={() => setEditing(m)}>
                Edit
              </Button>
              <Button variant="ghost" onClick={() => setDeleting(m)}>
                Delete
              </Button>
            </Td>
          </tr>
        ))}
      </DataTable>

      <Modal
        title={editing === 'new' ? 'New member' : 'Edit member'}
        open={editing !== null}
        onClose={() => setEditing(null)}
      >
        <MemberForm
          member={editing === 'new' || editing === null ? undefined : editing}
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
