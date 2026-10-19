import type { ComponentProps, ReactNode } from 'react';
import type { FieldError } from 'react-hook-form';
import { Button, ErrorBanner } from './ui';

const control =
  'mt-1 block w-full rounded-md border border-slate-300 px-3 py-2 text-sm shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500 aria-[invalid=true]:border-red-400';

export function Field({
  label,
  error,
  hint,
  children,
}: {
  label: string;
  error?: FieldError;
  hint?: string;
  children: ReactNode;
}) {
  return (
    <label className="mb-4 block text-sm font-medium text-slate-700">
      {label}
      {children}
      {error ? (
        <span className="mt-1 block text-xs font-normal text-red-600">
          {error.message}
        </span>
      ) : (
        hint && (
          <span className="mt-1 block text-xs font-normal text-slate-500">
            {hint}
          </span>
        )
      )}
    </label>
  );
}

// ComponentProps includes `ref`, which React 19 passes as a normal prop,
// so `{...register('field')}` from React Hook Form works on these wrappers.
export const Input = (props: ComponentProps<'input'>) => (
  <input className={control} {...props} />
);

export const Select = (props: ComponentProps<'select'>) => (
  <select className={control} {...props} />
);

export const TextArea = (props: ComponentProps<'textarea'>) => (
  <textarea className={control} rows={4} {...props} />
);

/** Server error banner + Cancel / Save buttons shared by every form. */
export function FormFooter({
  serverError,
  isSubmitting,
  onCancel,
  submitLabel = 'Save',
}: {
  serverError: unknown;
  isSubmitting: boolean;
  onCancel: () => void;
  submitLabel?: string;
}) {
  return (
    <>
      <ErrorBanner error={serverError} />
      <div className="flex justify-end gap-2">
        <Button variant="secondary" onClick={onCancel}>
          Cancel
        </Button>
        <Button type="submit" disabled={isSubmitting}>
          {isSubmitting ? 'Saving…' : submitLabel}
        </Button>
      </div>
    </>
  );
}
