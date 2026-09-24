import { useId } from "react";
import { cn } from "@/lib/utils";

const controlClass = cn(
  "w-full rounded-xl border border-border bg-surface-2 px-4 py-3 text-base text-foreground outline-none",
  "transition-[border-color,background-color,box-shadow] duration-200 placeholder:text-muted-foreground/70",
  "focus:border-accent-strong focus:bg-surface focus:shadow-[0_0_0_4px_rgb(11_115_85/0.14)]",
  "aria-invalid:border-red-500 aria-invalid:focus:shadow-[0_0_0_4px_rgb(239_68_68/0.14)]",
);

type BaseProps = {
  label: string;
  name: string;
  error?: string;
  /** Small note next to the label, e.g. "optional". */
  hint?: string;
};

function FieldShell({
  id,
  label,
  hint,
  error,
  children,
}: {
  id: string;
  label: string;
  hint?: string;
  error?: string;
  children: React.ReactNode;
}) {
  return (
    <div className="grid gap-2">
      <label htmlFor={id} className="flex items-baseline justify-between text-sm font-semibold">
        {label}
        {hint && <span className="text-xs font-normal text-muted-foreground">{hint}</span>}
      </label>
      {children}
      {error && (
        <p id={`${id}-error`} className="text-sm text-red-600 dark:text-red-400">
          {error}
        </p>
      )}
    </div>
  );
}

function a11y(id: string, error?: string) {
  return {
    id,
    "aria-invalid": error ? true : undefined,
    "aria-describedby": error ? `${id}-error` : undefined,
  };
}

type FieldProps = BaseProps & { multiline?: boolean } & Omit<React.ComponentProps<"input">, "name">;

/** Labeled input or textarea with an accessible error message. */
export function Field({ label, name, error, hint, multiline, className, ...props }: FieldProps) {
  const id = useId();
  return (
    <FieldShell id={id} label={label} hint={hint} error={error}>
      {multiline ? (
        <textarea
          {...a11y(id, error)}
          name={name}
          rows={5}
          required={props.required}
          placeholder={props.placeholder}
          defaultValue={props.defaultValue as string | undefined}
          className={cn(controlClass, "min-h-32 resize-y", className)}
        />
      ) : (
        <input {...a11y(id, error)} name={name} className={cn(controlClass, className)} {...props} />
      )}
    </FieldShell>
  );
}

type SelectProps = BaseProps & Omit<React.ComponentProps<"select">, "name">;

export function SelectField({ label, name, error, hint, className, children, ...props }: SelectProps) {
  const id = useId();
  return (
    <FieldShell id={id} label={label} hint={hint} error={error}>
      <div className="relative">
        <select
          {...a11y(id, error)}
          name={name}
          className={cn(controlClass, "appearance-none pr-11", className)}
          {...props}
        >
          {children}
        </select>
        <svg
          aria-hidden
          viewBox="0 0 20 20"
          className="pointer-events-none absolute top-1/2 right-4 size-4 -translate-y-1/2 text-muted-foreground"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.8"
        >
          <path d="m5 8 5 5 5-5" />
        </svg>
      </div>
    </FieldShell>
  );
}
