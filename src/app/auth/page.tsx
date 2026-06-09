"use client";

import { useState } from "react";
import Link from "next/link";
import { Mail, Lock, User, ShieldCheck } from "lucide-react";
import { toast } from "sonner";
import { Brand } from "@/components/brand";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

const inputCls = "h-11 w-full rounded-lg border border-input bg-card pl-10 pr-3 text-sm outline-none focus:border-ring focus:ring-3 focus:ring-ring/30";

export default function AuthPage() {
  const [mode, setMode] = useState<"in" | "up">("in");

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
              <button key={m} onClick={() => setMode(m)} className={cn("rounded-md py-1.5 transition-colors", mode === m ? "bg-card text-foreground shadow-sm" : "text-muted-foreground")}>
                {m === "in" ? "Sign in" : "Sign up"}
              </button>
            ))}
          </div>

          <form
            className="mt-5 space-y-3"
            onSubmit={(e) => { e.preventDefault(); toast.success(mode === "in" ? "Signed in" : "Account created", { description: "Welcome to AussieWheels!" }); }}
          >
            {mode === "up" && (
              <Field Icon={User}><input className={inputCls} placeholder="Full name" required /></Field>
            )}
            <Field Icon={Mail}><input type="email" className={inputCls} placeholder="Email address" required /></Field>
            <Field Icon={Lock}><input type="password" className={inputCls} placeholder="Password" required /></Field>

            {mode === "in" && (
              <div className="text-right">
                <button type="button" className="text-xs font-medium text-brand hover:underline">Forgot password?</button>
              </div>
            )}

            <Button type="submit" className="h-11 w-full">{mode === "in" ? "Sign in" : "Create account"}</Button>
          </form>

          <div className="my-5 flex items-center gap-3 text-xs text-muted-foreground">
            <span className="h-px flex-1 bg-border" /> or <span className="h-px flex-1 bg-border" />
          </div>
          <div className="grid grid-cols-2 gap-3">
            <button className="h-11 rounded-lg border text-sm font-medium hover:bg-muted">Google</button>
            <button className="h-11 rounded-lg border text-sm font-medium hover:bg-muted">Apple</button>
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
