"use client";
import type { FormEvent, ReactNode } from "react";
import { toast } from "sonner";

type FormShellProps = {
  title: string;
  description?: string;
  children: ReactNode;
  onSubmit: (e: FormEvent<HTMLFormElement>) => void;
  actions?: ReactNode;
};

export default function FormShell({
  title,
  description,
  children,
  onSubmit,
  actions,
}: FormShellProps) {
  return (
    <div className="mx-auto w-full rounded-2xl border p-6 shadow-sm">
      <header className="mb-6 space-y-1">
        <h1 className="text-2xl font-semibold tracking-tight">{title}</h1>
        {description ? (
          <p className="text-muted-foreground text-sm">{description}</p>
        ) : null}
      </header>
      <form
        className="grid gap-4"
        onSubmit={(e) => {
          try {
            onSubmit(e);
          } catch (err) {
            toast.error("Submission error");
            console.error(err);
          }
        }}
      >
        <div className="grid gap-4">{children}</div>
        <div className="mt-4 flex items-center gap-3">
          <button
            type="submit"
            className="rounded-xl bg-primary px-4 py-2 text-primary-foreground hover:opacity-90"
          >
            Submit
          </button>
          {actions}
        </div>
      </form>
    </div>
  );
}
