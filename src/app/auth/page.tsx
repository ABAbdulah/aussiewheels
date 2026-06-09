"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Mail, Lock, User, ShieldCheck, Eye, EyeOff, Loader2, AlertCircle } from "lucide-react";
import { toast } from "sonner";
import { Brand } from "@/components/brand";
import { Button } from "@/components/ui/button";
import { signup, login } from "@/lib/auth";
import { cn } from "@/lib/utils";

const inputCls = "h-11 w-full rounded-lg border border-input bg-card pl-10 pr-3 text-sm outline-none focus:border-ring focus:ring-3 focus:ring-ring/30";

const GoogleIcon = ({ className }: { className?: string }) => (
  <svg viewBox="0 0 24 24" className={className} aria-hidden>
    <path fill="#4285F4" d="M23.06 12.25c0-.85-.08-1.67-.22-2.45H12v4.64h6.2a5.3 5.3 0 0 1-2.3 3.48v2.88h3.72c2.18-2 3.44-4.96 3.44-8.55Z" />
    <path fill="#34A853" d="M12 24c3.12 0 5.73-1.03 7.64-2.8l-3.72-2.88c-1.03.69-2.35 1.1-3.92 1.1-3.01 0-5.56-2.03-6.47-4.77H1.69v2.97A11.5 11.5 0 0 0 12 24Z" />
    <path fill="#FBBC05" d="M5.53 14.65a6.9 6.9 0 0 1 0-4.4V7.28H1.69a11.5 11.5 0 0 0 0 10.34l3.84-2.97Z" />
    <path fill="#EA4335" d="M12 4.77c1.7 0 3.22.58 4.42 1.72l3.3-3.3C17.73 1.2 15.12 0 12 0 7.39 0 3.42 2.66 1.69 6.53l3.84 2.97C6.44 6.8 8.99 4.77 12 4.77Z" />
  </svg>
);

const AppleIcon = ({ className }: { className?: string }) => (
  <svg viewBox="0 0 24 24" className={className} fill="currentColor" aria-hidden>
    <path d="M17.05 12.04c-.03-2.6 2.12-3.85 2.22-3.91-1.21-1.77-3.1-2.01-3.77-2.04-1.6-.16-3.13.94-3.94.94-.82 0-2.07-.92-3.4-.9-1.75.03-3.37 1.02-4.27 2.59-1.82 3.16-.47 7.84 1.3 10.41.86 1.26 1.89 2.67 3.23 2.62 1.3-.05 1.79-.84 3.36-.84 1.56 0 2 .84 3.37.81 1.39-.02 2.27-1.28 3.12-2.55.98-1.46 1.39-2.88 1.41-2.95-.03-.01-2.71-1.04-2.74-4.13M14.6 4.3c.72-.87 1.2-2.08 1.07-3.3-1.03.04-2.28.69-3.02 1.56-.66.77-1.24 2-1.08 3.18 1.15.09 2.32-.58 3.03-1.44" />
  </svg>
);

export default function AuthPage() {
  const router = useRouter();
  const [mode, setMode] = useState<"in" | "up">("in");
  const [showPw, setShowPw] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setError(null);
    const form = new FormData(e.currentTarget);
    const name = String(form.get("name") ?? "");
    const email = String(form.get("email") ?? "");
    const password = String(form.get("password") ?? "");

    setLoading(true);
    try {
      const session = mode === "up" ? await signup(name, email, password) : await login(email, password);
      toast.success(mode === "up" ? "Account created" : "Signed in", { description: `Welcome${session.user.name ? `, ${session.user.name.split(" ")[0]}` : ""}!` });
      router.push("/");
    } catch (err) {
      const message = err instanceof Error ? err.message : "Something went wrong";
      setError(message);
      toast.error(mode === "up" ? "Couldn't create account" : "Couldn't sign in", { description: message });
    } finally {
      setLoading(false);
    }
  }

  function switchMode(m: "in" | "up") {
    setMode(m);
    setError(null);
  }

  return (
    <div className="grid min-h-[calc(100vh-4rem)] lg:grid-cols-2">
      {/* Form */}
      <div className="flex items-center justify-center px-4 py-12">
        <div className="w-full max-w-sm">
          <Brand />
          <h1 className="mt-6 text-2xl font-bold tracking-tight">{mode === "in" ? "Welcome back" : "Create your account"}</h1>
          <p className="mt-1 text-sm text-muted-foreground">
            {mode === "in" ? "Sign in to save searches, message sellers and manage your ads." : "Join to save cars, get alerts and sell with confidence."}
          </p>

          {/* Tabs */}
          <div className="mt-6 grid grid-cols-2 rounded-lg bg-muted p-1 text-sm font-semibold">
            {(["in", "up"] as const).map((m) => (
              <button key={m} type="button" onClick={() => switchMode(m)} className={cn("rounded-md py-1.5 transition-colors", mode === m ? "bg-card text-foreground shadow-sm" : "text-muted-foreground")}>
                {m === "in" ? "Sign in" : "Sign up"}
              </button>
            ))}
          </div>

          {error && (
            <div className="mt-4 flex items-start gap-2 rounded-lg border border-destructive/30 bg-destructive/8 px-3 py-2 text-sm text-destructive">
              <AlertCircle className="mt-0.5 size-4 shrink-0" /> {error}
            </div>
          )}

          <form className="mt-4 space-y-3" onSubmit={onSubmit}>
            {mode === "up" && (
              <Field Icon={User}><input name="name" className={inputCls} placeholder="Full name" required minLength={1} /></Field>
            )}
            <Field Icon={Mail}><input name="email" type="email" className={inputCls} placeholder="Email address" required /></Field>
            <Field Icon={Lock}>
              <input name="password" type={showPw ? "text" : "password"} className={cn(inputCls, "pr-10")} placeholder="Password" required minLength={mode === "up" ? 6 : 1} />
              <button type="button" onClick={() => setShowPw((s) => !s)} aria-label={showPw ? "Hide password" : "Show password"} className="absolute right-2.5 top-1/2 -translate-y-1/2 text-muted-foreground transition-colors hover:text-foreground">
                {showPw ? <EyeOff className="size-4" /> : <Eye className="size-4" />}
              </button>
            </Field>

            {mode === "up" && <p className="pl-1 text-xs text-muted-foreground">Use at least 6 characters.</p>}

            {mode === "in" && (
              <div className="text-right">
                <Link href="/auth/forgot" className="text-xs font-medium text-brand hover:underline">Forgot password?</Link>
              </div>
            )}

            <Button type="submit" disabled={loading} className="h-11 w-full">
              {loading && <Loader2 className="size-4 animate-spin" />}
              {mode === "in" ? "Sign in" : "Create account"}
            </Button>
          </form>

          <div className="my-5 flex items-center gap-3 text-xs text-muted-foreground">
            <span className="h-px flex-1 bg-border" /> or <span className="h-px flex-1 bg-border" />
          </div>
          <div className="grid grid-cols-2 gap-3">
            <button type="button" onClick={() => toast.message("Coming soon", { description: "Social sign-in is on the way." })} className="inline-flex h-11 items-center justify-center gap-2 rounded-lg border text-sm font-medium hover:bg-muted">
              <GoogleIcon className="size-4.5" /> Google
            </button>
            <button type="button" onClick={() => toast.message("Coming soon", { description: "Social sign-in is on the way." })} className="inline-flex h-11 items-center justify-center gap-2 rounded-lg border text-sm font-medium hover:bg-muted">
              <AppleIcon className="size-4.5" /> Apple
            </button>
          </div>

          <p className="mt-6 text-center text-xs text-muted-foreground">
            By continuing you agree to our{" "}
            <Link href="/info/terms-conditions" className="text-brand hover:underline">Terms</Link> and{" "}
            <Link href="/info/privacy-policy" className="text-brand hover:underline">Privacy Policy</Link>.
          </p>
        </div>
      </div>

      {/* Aside */}
      <div className="relative hidden overflow-hidden bg-primary text-primary-foreground lg:block">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(46,109,164,0.5),transparent_60%)]" />
        <div className="relative flex h-full flex-col justify-center px-12">
          <h2 className="text-3xl font-extrabold leading-tight tracking-tight">Australia&apos;s smarter car marketplace</h2>
          <ul className="mt-6 space-y-3 text-primary-foreground/85">
            {["Save searches & get instant price-drop alerts", "Message sellers securely in-app", "Pay safely with Pay through AussieWheels", "Free, no-obligation valuations"].map((t) => (
              <li key={t} className="flex items-center gap-2"><ShieldCheck className="size-4 text-success" /> {t}</li>
            ))}
          </ul>
        </div>
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
