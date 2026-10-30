import { useState, type FormEvent } from "react";
import { Button } from "@/components/ui/Button";

interface FieldErrors {
  [key: string]: string;
}

export function InquiryForm({
  heading,
  description,
  submitLabel = "Submit",
  extraFields,
}: {
  heading: string;
  description?: string;
  submitLabel?: string;
  extraFields?: { id: string; label: string; type?: string; options?: string[] }[];
}) {
  const [values, setValues] = useState<Record<string, string>>({});
  const [errors, setErrors] = useState<FieldErrors>({});
  const [submitted, setSubmitted] = useState(false);

  function validate(): FieldErrors {
    const next: FieldErrors = {};
    if (!values.parentName?.trim()) next.parentName = "Please enter your name.";
    if (!values.email?.trim()) {
      next.email = "Please enter an email address.";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(values.email)) {
      next.email = "Please enter a valid email address.";
    }
    if (!values.studentGrade?.trim()) next.studentGrade = "Please tell us the class you have in mind.";
    extraFields?.forEach((f) => {
      if (f.type !== "textarea-optional" && !values[f.id]?.trim()) {
        next[f.id] = `Please complete ${f.label.toLowerCase()}.`;
      }
    });
    return next;
  }

  function handleSubmit(e: FormEvent) {
    e.preventDefault();
    const nextErrors = validate();
    setErrors(nextErrors);
    if (Object.keys(nextErrors).length === 0) {
      setSubmitted(true);
    }
  }

  function update(id: string, value: string) {
    setValues((v) => ({ ...v, [id]: value }));
  }

  if (submitted) {
    return (
      <div role="status" className="rounded-lg border border-control-border bg-brand-green-100 p-8 text-center">
        <p className="font-display text-xl font-bold text-brand-green-900">Thank you!</p>
        <p className="mt-2 text-sm text-ink/75">
          This is a demonstration form — no data was sent and no real inquiry was submitted. In a production
          deployment this would route to the admissions team.
        </p>
        <Button
          type="button"
          variant="outline-green"
          size="sm"
          className="mt-5"
          onClick={() => {
            setSubmitted(false);
            setValues({});
          }}
        >
          Submit another response
        </Button>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} noValidate className="space-y-5 rounded-lg border border-black/5 bg-white p-6 shadow-sm sm:p-8">
      <div>
        <h3 className="font-display text-xl font-bold text-brand-green-900">{heading}</h3>
        {description && <p className="mt-1 text-sm text-ink/70">{description}</p>}
      </div>

      <div className="grid gap-5 sm:grid-cols-2">
        <Field
          id="parentName"
          label="Your Name"
          value={values.parentName ?? ""}
          onChange={update}
          error={errors.parentName}
        />
        <Field
          id="email"
          label="Email Address"
          type="email"
          value={values.email ?? ""}
          onChange={update}
          error={errors.email}
        />
      </div>

      <Field
        id="studentGrade"
        label="Class of Interest"
        value={values.studentGrade ?? ""}
        onChange={update}
        error={errors.studentGrade}
      />

      {extraFields?.map((f) =>
        f.type === "select" ? (
          <div key={f.id}>
            <label htmlFor={f.id} className="mb-1 block text-sm font-semibold text-brand-green-900">
              {f.label}
            </label>
            <select
              id={f.id}
              value={values[f.id] ?? ""}
              onChange={(e) => update(f.id, e.target.value)}
              aria-invalid={Boolean(errors[f.id])}
              className="focus-ring w-full rounded border border-control-border px-3 py-2.5 text-sm"
            >
              <option value="">Select…</option>
              {f.options?.map((o) => (
                <option key={o}>{o}</option>
              ))}
            </select>
            {errors[f.id] && (
              <p role="alert" className="mt-1 text-xs font-medium text-brand-coral-ink">
                {errors[f.id]}
              </p>
            )}
          </div>
        ) : (
          <div key={f.id}>
            <label htmlFor={f.id} className="mb-1 block text-sm font-semibold text-brand-green-900">
              {f.label}
            </label>
            <textarea
              id={f.id}
              rows={4}
              value={values[f.id] ?? ""}
              onChange={(e) => update(f.id, e.target.value)}
              aria-invalid={Boolean(errors[f.id])}
              className="focus-ring w-full rounded border border-control-border px-3 py-2.5 text-sm"
            />
            {errors[f.id] && (
              <p role="alert" className="mt-1 text-xs font-medium text-brand-coral-ink">
                {errors[f.id]}
              </p>
            )}
          </div>
        ),
      )}

      <Button type="submit" className="w-full sm:w-auto">
        {submitLabel}
      </Button>
    </form>
  );
}

function Field({
  id,
  label,
  value,
  onChange,
  error,
  type = "text",
}: {
  id: string;
  label: string;
  value: string;
  onChange: (id: string, value: string) => void;
  error?: string;
  type?: string;
}) {
  return (
    <div>
      <label htmlFor={id} className="mb-1 block text-sm font-semibold text-brand-green-900">
        {label}
      </label>
      <input
        id={id}
        type={type}
        value={value}
        onChange={(e) => onChange(id, e.target.value)}
        aria-invalid={Boolean(error)}
        aria-describedby={error ? `${id}-error` : undefined}
        className="focus-ring w-full rounded border border-control-border px-3 py-2.5 text-sm"
      />
      {error && (
        <p id={`${id}-error`} role="alert" className="mt-1 text-xs font-medium text-brand-coral-ink">
          {error}
        </p>
      )}
    </div>
  );
}
