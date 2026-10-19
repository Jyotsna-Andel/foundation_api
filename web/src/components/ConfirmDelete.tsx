import type { UseMutationResult } from '@tanstack/react-query';
import { Modal } from './Modal';
import { Button, ErrorBanner } from './ui';

/**
 * Delete confirmation. Shows the API's error (e.g. 409 "still referenced")
 * instead of closing when the delete is refused.
 */
export function ConfirmDelete({
  target,
  onClose,
  mutation,
}: {
  target: { id: string; label: string } | null;
  onClose: () => void;
  mutation: UseMutationResult<void, Error, string>;
}) {
  const close = () => {
    mutation.reset();
    onClose();
  };

  return (
    <Modal title="Delete?" open={target !== null} onClose={close}>
      <p className="mb-4 text-sm text-slate-600">
        Delete <strong>{target?.label}</strong>? This cannot be undone.
      </p>
      <ErrorBanner error={mutation.error} />
      <div className="flex justify-end gap-2">
        <Button variant="secondary" onClick={close}>
          Cancel
        </Button>
        <Button
          variant="danger"
          disabled={mutation.isPending}
          onClick={() =>
            target && mutation.mutate(target.id, { onSuccess: close })
          }
        >
          {mutation.isPending ? 'Deleting…' : 'Delete'}
        </Button>
      </div>
    </Modal>
  );
}
