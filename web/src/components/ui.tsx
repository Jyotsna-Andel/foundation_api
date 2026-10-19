import type { ButtonHTMLAttributes, ReactNode } from 'react';
import { ApiError } from '../api/client';

type Variant = 'primary' | 'secondary' | 'danger' | 'ghost';

const variants: Record<Variant, string> = {
  primary: 'bg-indigo-600 text-white hover:bg-indigo-700',
  secondary:
    'border border-slate-300 bg-white text-slate-700 hover:bg-slate-50',
  danger: 'bg-red-600 text-white hover:bg-red-700',
  ghost: 'text-slate-600 hover:bg-slate-100',
};

export function Button({
  variant = 'primary',
  className = '',
  ...props
}: ButtonHTMLAttributes<HTMLButtonElement> & { variant?: Variant }) {
  return (
    <button
      type="button"
      className={`rounded-md px-3 py-1.5 text-sm font-medium disabled:cursor-not-allowed disabled:opacity-50 ${variants[variant]} ${className}`}
      {...props}
    />
  );
}

export function PageHeader({
  title,
  description,
  action,
}: {
  title: string;
  description?: string;
  action?: ReactNode;
}) {
  return (
    <div className="mb-5 flex flex-wrap items-end justify-between gap-3">
      <div>
        <h1 className="text-2xl font-semibold text-slate-900">{title}</h1>
        {description && (
          <p className="mt-1 text-sm text-slate-500">{description}</p>
        )}
      </div>
      {action}
    </div>
  );
}

/** Shows API errors (including the list of validation messages) or any other error. */
export function ErrorBanner({ error }: { error: unknown }) {
  if (!error) return null;
  const messages =
    error instanceof ApiError
      ? error.messages
      : [error instanceof Error ? error.message : 'Something went wrong'];

  return (
    <div
      role="alert"
      className="mb-4 rounded-md border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700"
    >
      {messages.length === 1 ? (
        messages[0]
      ) : (
        <ul className="list-inside list-disc">
          {messages.map((m) => (
            <li key={m}>{m}</li>
          ))}
        </ul>
      )}
    </div>
  );
}

/** Table wrapper that handles the loading / error / empty states. */
export function DataTable({
  headers,
  isLoading,
  error,
  isEmpty,
  emptyText,
  children,
}: {
  headers: string[];
  isLoading: boolean;
  error: unknown;
  isEmpty: boolean;
  emptyText: string;
  children: ReactNode;
}) {
  if (error) return <ErrorBanner error={error} />;

  return (
    <div className="overflow-x-auto rounded-lg border border-slate-200 bg-white">
      <table className="min-w-full divide-y divide-slate-200 text-sm">
        <thead className="bg-slate-50">
          <tr>
            {headers.map((h) => (
              <th
                key={h}
                className="px-4 py-2.5 text-left font-medium text-slate-600"
              >
                {h}
              </th>
            ))}
          </tr>
        </thead>
        <tbody className="divide-y divide-slate-100">
          {isLoading ? (
            <tr>
              <td colSpan={headers.length} className="px-4 py-6 text-slate-500">
                Loading…
              </td>
            </tr>
          ) : isEmpty ? (
            <tr>
              <td colSpan={headers.length} className="px-4 py-6 text-slate-500">
                {emptyText}
              </td>
            </tr>
          ) : (
            children
          )}
        </tbody>
      </table>
    </div>
  );
}

export function Td({
  children,
  className = '',
}: {
  children: ReactNode;
  className?: string;
}) {
  return <td className={`px-4 py-2.5 align-top ${className}`}>{children}</td>;
}

export function Badge({
  tone,
  children,
}: {
  tone: 'green' | 'amber' | 'red' | 'slate';
  children: ReactNode;
}) {
  const tones = {
    green: 'bg-green-50 text-green-700 ring-green-600/20',
    amber: 'bg-amber-50 text-amber-700 ring-amber-600/20',
    red: 'bg-red-50 text-red-700 ring-red-600/20',
    slate: 'bg-slate-100 text-slate-600 ring-slate-500/20',
  };
  return (
    <span
      className={`inline-flex rounded-full px-2 py-0.5 text-xs font-medium ring-1 ring-inset ${tones[tone]}`}
    >
      {children}
    </span>
  );
}
