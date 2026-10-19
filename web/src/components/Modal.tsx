import { useEffect, useRef, type ReactNode } from 'react';

/** Accessible modal built on the native <dialog> element (Esc closes it). */
export function Modal({
  title,
  open,
  onClose,
  children,
}: {
  title: string;
  open: boolean;
  onClose: () => void;
  children: ReactNode;
}) {
  const ref = useRef<HTMLDialogElement>(null);

  useEffect(() => {
    const dialog = ref.current;
    if (!dialog) return;
    if (open && !dialog.open) dialog.showModal();
    if (!open && dialog.open) dialog.close();
  }, [open]);

  return (
    <dialog
      ref={ref}
      onClose={onClose}
      className="m-auto w-full max-w-lg rounded-lg p-0 shadow-xl backdrop:bg-slate-900/40"
    >
      {open && (
        <div className="p-6">
          <h2 className="mb-4 text-lg font-semibold text-slate-900">{title}</h2>
          {children}
        </div>
      )}
    </dialog>
  );
}
