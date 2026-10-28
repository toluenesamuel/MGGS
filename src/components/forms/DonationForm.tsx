import { useState, type FormEvent } from "react";
import { Button } from "@/components/ui/Button";
import { cn } from "@/utils/cn";

const presetAmounts = [5000, 10000, 25000, 50000];
const designations = [
  "Area of Greatest Need",
  "Teaching & Learning Resources",
  "Books & Learning Materials",
  "School Environment & Upkeep",
  "Family Support Fund",
];

export function DonationForm() {
  const [amount, setAmount] = useState<number | null>(presetAmounts[0]);
  const [customAmount, setCustomAmount] = useState("");
  const [designation, setDesignation] = useState(designations[0]);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [submitted, setSubmitted] = useState(false);

  const effectiveAmount = amount ?? Number(customAmount || 0);

  function handleSubmit(e: FormEvent) {
    e.preventDefault();
    const next: Record<string, string> = {};
    if (!effectiveAmount || effectiveAmount <= 0) next.amount = "Please choose or enter a gift amount greater than ₦0.";
    if (!name.trim()) next.name = "Please enter your name.";
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) next.email = "Please enter a valid email address.";
    setErrors(next);
    if (Object.keys(next).length === 0) setSubmitted(true);
  }

  if (submitted) {
    return (
      <div role="status" className="rounded-lg border border-white/20 bg-white/10 p-8 text-center text-white">
        <p className="font-display text-2xl font-extrabold">Thank you, {name.split(" ")[0]}!</p>
        <p className="mt-2 text-sm text-white/85">
          This is a safe, demonstration-only donation form — <strong>no payment was processed</strong> and no real
          transaction occurred. Your simulated gift of ₦{effectiveAmount.toLocaleString()} would have supported{" "}
          {designation}.
        </p>
        <Button variant="outline-white" size="sm" className="mt-5" onClick={() => setSubmitted(false)}>
          Make another simulated gift
        </Button>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} noValidate className="rounded-lg bg-white p-6 shadow-xl sm:p-8">
      <p className="font-display text-sm font-bold uppercase tracking-wide text-brand-gold">Make a gift today</p>
      <h3 className="font-display mt-1 text-2xl font-extrabold text-brand-green-900">Support Marvellous Greatness Group of Schools</h3>

      <fieldset className="mt-6">
        <legend className="mb-2 text-sm font-semibold text-brand-green-900">Gift Amount (NGN)</legend>
        <div className="grid grid-cols-4 gap-2">
          {presetAmounts.map((value) => (
            <button
              key={value}
              type="button"
              onClick={() => {
                setAmount(value);
                setCustomAmount("");
              }}
              className={cn(
                "focus-ring rounded border py-2.5 text-sm font-bold",
                amount === value
                  ? "border-brand-coral bg-brand-coral text-ink"
                  : "border-brand-green-900/20 text-brand-green-900 hover:border-brand-coral",
              )}
            >
              ₦{value.toLocaleString()}
            </button>
          ))}
        </div>
        <label htmlFor="customAmount" className="mt-3 block text-xs font-semibold text-ink/60">
          Or enter a custom amount
        </label>
        <input
          id="customAmount"
          type="number"
          min={1}
          inputMode="numeric"
          value={customAmount}
          onChange={(e) => {
            setCustomAmount(e.target.value);
            setAmount(null);
          }}
          placeholder="₦"
          className="focus-ring mt-1 w-full rounded border border-brand-green-900/20 px-3 py-2 text-sm"
        />
        {errors.amount && (
          <p role="alert" className="mt-1 text-xs font-medium text-brand-gold">
            {errors.amount}
          </p>
        )}
      </fieldset>

      <div className="mt-5">
        <label htmlFor="designation" className="mb-1 block text-sm font-semibold text-brand-green-900">
          Designate my gift to
        </label>
        <select
          id="designation"
          value={designation}
          onChange={(e) => setDesignation(e.target.value)}
          className="focus-ring w-full rounded border border-brand-green-900/20 px-3 py-2.5 text-sm"
        >
          {designations.map((d) => (
            <option key={d}>{d}</option>
          ))}
        </select>
      </div>

      <div className="mt-5 grid gap-5 sm:grid-cols-2">
        <div>
          <label htmlFor="donorName" className="mb-1 block text-sm font-semibold text-brand-green-900">
            Full Name
          </label>
          <input
            id="donorName"
            value={name}
            onChange={(e) => setName(e.target.value)}
            aria-invalid={Boolean(errors.name)}
            className="focus-ring w-full rounded border border-brand-green-900/20 px-3 py-2.5 text-sm"
          />
          {errors.name && (
            <p role="alert" className="mt-1 text-xs font-medium text-brand-gold">
              {errors.name}
            </p>
          )}
        </div>
        <div>
          <label htmlFor="donorEmail" className="mb-1 block text-sm font-semibold text-brand-green-900">
            Email
          </label>
          <input
            id="donorEmail"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            aria-invalid={Boolean(errors.email)}
            className="focus-ring w-full rounded border border-brand-green-900/20 px-3 py-2.5 text-sm"
          />
          {errors.email && (
            <p role="alert" className="mt-1 text-xs font-medium text-brand-gold">
              {errors.email}
            </p>
          )}
        </div>
      </div>

      <Button type="submit" className="mt-6 w-full">
        Give ₦{(effectiveAmount || 0).toLocaleString()} (demo)
      </Button>
      <p className="mt-3 text-center text-xs text-ink/50">
        Demonstration form only. No payment processor is connected and no real donation will be made.
      </p>
    </form>
  );
}
