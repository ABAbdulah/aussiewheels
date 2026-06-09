"use client";

import { useSyncExternalStore } from "react";
import { siteConfig } from "./site";

export type AuthUser = { id: string; name: string; email: string };
type Session = { token: string; user: AuthUser };

const KEY = "aw:auth";
const EVT = "aw:auth-changed";

function readSession(): Session | null {
  if (typeof window === "undefined") return null;
  try {
    return JSON.parse(localStorage.getItem(KEY) ?? "null");
  } catch {
    return null;
  }
}

function writeSession(s: Session | null) {
  if (s) localStorage.setItem(KEY, JSON.stringify(s));
  else localStorage.removeItem(KEY);
  window.dispatchEvent(new Event(EVT));
}

async function post(path: string, body: unknown): Promise<Session> {
  const res = await fetch(`${siteConfig.apiUrl}${path}`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(body),
  });
  let data: unknown = null;
  try {
    data = await res.json();
  } catch {
    /* noop */
  }
  if (!res.ok) {
    const msg = (data as { message?: string })?.message ?? "Something went wrong. Please try again.";
    throw new Error(msg);
  }
  const session = data as Session;
  writeSession(session);
  return session;
}

export const signup = (name: string, email: string, password: string) =>
  post("/api/v1/auth/signup", { name, email, password });

export const login = (email: string, password: string) =>
  post("/api/v1/auth/login", { email, password });

export function logout() {
  writeSession(null);
}

export function getToken(): string | null {
  return readSession()?.token ?? null;
}

// ── React subscription ───────────────────────────────────────────────────────
function subscribe(cb: () => void) {
  window.addEventListener(EVT, cb);
  window.addEventListener("storage", cb);
  return () => {
    window.removeEventListener(EVT, cb);
    window.removeEventListener("storage", cb);
  };
}

let cache: Session | null = null;
let cacheKey = "";
function getSnapshot(): AuthUser | null {
  const raw = localStorage.getItem(KEY) ?? "null";
  if (raw !== cacheKey) {
    cacheKey = raw;
    cache = readSession();
  }
  return cache?.user ?? null;
}

export function useAuth(): AuthUser | null {
  return useSyncExternalStore(subscribe, getSnapshot, () => null);
}
