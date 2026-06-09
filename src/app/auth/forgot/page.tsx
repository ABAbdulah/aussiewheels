"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Mail, Lock, KeyRound, Eye, EyeOff, Loader2, AlertCircle, ArrowLeft, MailCheck } from "lucide-react";
import { toast } from "sonner";
import { Brand } from "@/components/brand";
import { Button } from "@/components/ui/button";
import { requestPasswordReset, resetPassword } from "@/lib/auth";
import { cn } from "@/lib/utils";

const inputCls = "h-11 w-full rounded-lg border border-input bg-card pl-10 pr-3 text-sm outline-none focus:border-ring focus:ring-3 focus:ring-ring/30";

export default function ForgotPasswordPage() {
  const router = useRouter();
  const [step, setStep] = useState<1 | 2>(1);
  const [email, setEmail] = useState("");
  const [code, setCode] = useState("");
  const [password, setPassword] = useState("");
  const [showPw, setShowPw] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function sendCode(e: React.FormEvent) {
    e.preventDefault();
    setError(null);
    setLoading(true);
    try {
      const msg = await requestPasswordReset(email);
      toast.success("Check your email", { description: msg });
      setStep(2);
    } catch (err) {
      const m = err instanceof Error ? err.message : "Something went wrong";
      setError(m);
      toast.error("Couldn't send code", { description: m });
    } finally {
      setLoading(false);
    }
  }

  async function submitReset(e: React.FormEvent) {
    e.preventDefault();
    setError(null);
    setLoading(true);
    try {
      await resetPassword(email, code, password);
      toast.success("Password updated", { description: "You're now signed in." });
      router.push("/");
    } catch (err) {
      const m = err instanceof Error ? err.message : "Something went wrong";
      setError(m);
      toast.error("Couldn't reset password", { description: m });
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="flex min-h-[calc(100vh-4rem)] items-center justify-center px-4 py-12">
      <div className="w-full max-w-sm">
        <Brand />
        <h1 className="mt-6 text-2xl font-bold tracking-tight">
          {step === 1 ? "Forgot your password?" : "Enter your reset code"}
        </h1>
        <p className="mt-1 text-sm text-muted-foreground">
          {step === 1
            ? "Enter your email and we'll send you a 6-digit code to reset it."
            : `We sent a code to ${email}. It expires in 10 minutes.`}
        </p>

        {error && (
          <div className="mt-4 flex items-start gap-2 rounded-lg border border-destructive/30 bg-destructive/8 px-3 py-2 text-sm text-destructive">
            <AlertCircle className="mt-0.5 size-4 shrink-0" /> {error}
          </div>
        )}

        {step === 1 ? (
          <form className="mt-5 space-y-3" onSubmit={sendCode}>
            <Field Icon={Mail}>
              <input type="email" required value={email} onChange={(e) => setEmail(e.target.value)} className={inputCls} placeholder="Email address" />
            </Field>
            <Button type="submit" disabled={loading} className="h-11 w-full">
              {loading && <Loader2 className="size-4 animate-spin" />} Send reset code
            </Button>
          </form>
        ) : (
          <form className="mt-5 space-y-3" onSubmit={submitReset}>
            <div className="mb-1 flex items-center gap-2 rounded-lg bg-accent/60 px-3 py-2 text-xs text-brand">
              <MailCheck className="size-4" /> Code sent — check your inbox (and spam).
            </div>
            <Field Icon={KeyRound}>
              <input inputMode="numeric" required value={code} onChange={(e) => setCode(e.target.value.replace(/\D/g, "").slice(0, 6))} className={cn(inputCls, "tracking-[0.4em] font-semibold")} placeholder="6-digit code" />
            </Field>
            <Field Icon={Lock}>
              <input type={showPw ? "text" : "password"} required minLength={6} value={password} onChange={(e) => setPassword(e.target.value)} className={cn(inputCls, "pr-10")} placeholder="New password" />
              <button type="button" onClick={() => setShowPw((s) => !s)} aria-label={showPw ? "Hide password" : "Show password"} className="absolute right-2.5 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground">
                {showPw ? <EyeOff className="size-4" /> : <Eye className="size-4" />}
              </button>
            </Field>
            <Button type="submit" disabled={loading} className="h-11 w-full">
              {loading && <Loader2 className="size-4 animate-spin" />} Reset password
            </Button>
            <button type="button" onClick={() => { setStep(1); setError(null); }} className="w-full text-center text-xs font-medium text-muted-foreground hover:text-foreground">
              Use a different email
            </button>
          </form>
        )}

        <Link href="/auth" className="mt-6 inline-flex items-center gap-1.5 text-sm font-medium text-brand hover:underline">
          <ArrowLeft className="size-4" /> Back to sign in
        </Link>
      </div>
    </div>
  );
}

function Field({ Icon, children }: { Icon: React.ElementType; children: React.ReactNode }) {
  return (
    <div className="relative">
      <Icon className="pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
      {children}
    </div>
  );
}
