"use client";

import { useMemo, useState } from "react";
import { Slider } from "@/components/ui/slider";
import { fmtPrice } from "@/lib/format";
import { cn } from "@/lib/utils";

const asNum = (v: number | readonly number[]) => (Array.isArray(v) ? v[0] : (v as number));

export function LoanCalculator({
  defaultAmount = 40000,
  className,
  compact = false,
}: {
  defaultAmount?: number;
  className?: string;
  compact?: boolean;
}) {
  const [amount, setAmount] = useState(defaultAmount);
  const [deposit, setDeposit] = useState(Math.round(defaultAmount * 0.1));
  const [termYears, setTermYears] = useState(5);
  const [rate, setRate] = useState(7.49);

  const { monthly, totalInterest, financed } = useMemo(() => {
    const financed = Math.max(0, amount - deposit);
    const r = rate / 100 / 12;
    const n = termYears * 12;
    const monthly = r === 0 ? financed / n : (financed * r) / (1 - Math.pow(1 + r, -n));
    const totalInterest = monthly * n - financed;
    return { monthly, totalInterest, financed };
  }, [amount, deposit, termYears, rate]);

  return (
    <div className={cn("rounded-2xl border bg-card p-5 ring-1 ring-foreground/5", className)}>
      <div className="flex items-baseline justify-between">
        <h3 className="text-base font-semibold">Repayment calculator</h3>
        <span className="text-[11px] text-muted-foreground">Indicative only</span>
      </div>

      {/* Result */}
      <div className="mt-4 rounded-xl bg-primary p-4 text-primary-foreground">
        <p className="text-xs opacity-80">Estimated repayments</p>
        <p className="mt-0.5 text-3xl font-bold tracking-tight tnum">
          {fmtPrice(Math.round(monthly))}
          <span className="ml-1 text-sm font-medium opacity-80">/ month</span>
        </p>
        <div className="mt-2 flex gap-4 text-[11px] opacity-80">
          <span>Borrowing {fmtPrice(financed)}</span>
          <span>Interest {fmtPrice(Math.round(totalInterest))}</span>
        </div>
      </div>

      {/* Controls */}
      <div className={cn("mt-5 space-y-5", compact && "space-y-4")}>
        <Field label="Car price" value={fmtPrice(amount)}>
          <Slider value={[amount]} min={5000} max={200000} step={500} onValueChange={(v) => setAmount(asNum(v))} />
        </Field>
        <Field label="Deposit" value={fmtPrice(deposit)}>
          <Slider value={[deposit]} min={0} max={Math.max(1000, amount)} step={500} onValueChange={(v) => setDeposit(asNum(v))} />
        </Field>
        <Field label="Loan term" value={`${termYears} year${termYears > 1 ? "s" : ""}`}>
          <Slider value={[termYears]} min={1} max={7} step={1} onValueChange={(v) => setTermYears(asNum(v))} />
        </Field>
        <Field label="Interest rate (p.a.)" value={`${rate.toFixed(2)}%`}>
          <Slider value={[rate]} min={3} max={15} step={0.1} onValueChange={(v) => setRate(asNum(v))} />
        </Field>
      </div>

      <p className="mt-4 text-[11px] leading-relaxed text-muted-foreground">
        For illustrative purposes only. Does not constitute an offer of credit or pre-qualification.
        Information is general in nature and should not be relied upon as financial advice.
      </p>
    </div>
  );
}

function Field({
  label,
  value,
  children,
}: {
  label: string;
  value: string;
  children: React.ReactNode;
}) {
  return (
    <div>
      <div className="mb-2 flex items-center justify-between text-sm">
        <span className="text-muted-foreground">{label}</span>
        <span className="font-semibold tnum">{value}</span>
      </div>
      {children}
    </div>
  );
}
