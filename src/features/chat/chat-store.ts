"use client";

import { useSyncExternalStore } from "react";

// Lightweight client-side chat store backed by localStorage. There's no auth or
// realtime backend yet, so conversations live in the browser and the "seller"
// auto-replies — enough for a fully demoable messaging experience.

export type ChatMessage = { id: string; from: "me" | "seller"; text: string; ts: number };
export type Conversation = {
  listingId: string;
  slug: string;
  title: string;
  image?: string;
  sellerName: string;
  price: number;
  messages: ChatMessage[];
  updatedAt: number;
};

const KEY = "aw:chats";
const EVT = "aw:chats-changed";

function read(): Record<string, Conversation> {
  if (typeof window === "undefined") return {};
  try {
    return JSON.parse(localStorage.getItem(KEY) ?? "{}");
  } catch {
    return {};
  }
}

function write(data: Record<string, Conversation>) {
  localStorage.setItem(KEY, JSON.stringify(data));
  window.dispatchEvent(new Event(EVT));
}

let counter = 0;
const uid = () => `${Date.now().toString(36)}-${(counter++).toString(36)}`;

const SELLER_REPLIES = [
  "Hi! Thanks for your message — yes, it's still available. Happy to answer any questions.",
  "Good question! It's been very well looked after and comes with full service history.",
  "You're welcome to come for an inspection and test drive. When suits you?",
  "I'm fairly firm on price, but let's chat — make me a fair offer.",
  "Sure, I can send through the service records and a CarFacts report.",
];

export function openConversation(meta: Omit<Conversation, "messages" | "updatedAt">) {
  const all = read();
  if (!all[meta.listingId]) {
    all[meta.listingId] = { ...meta, messages: [], updatedAt: Date.now() };
    write(all);
  }
}

export function sendMessage(listingId: string, text: string) {
  const all = read();
  const c = all[listingId];
  if (!c) return;
  c.messages.push({ id: uid(), from: "me", text, ts: Date.now() });
  c.updatedAt = Date.now();
  write({ ...all });

  // Simulated seller reply
  const reply = SELLER_REPLIES[c.messages.filter((m) => m.from === "me").length % SELLER_REPLIES.length];
  window.setTimeout(() => {
    const cur = read();
    const conv = cur[listingId];
    if (!conv) return;
    conv.messages.push({ id: uid(), from: "seller", text: reply, ts: Date.now() });
    conv.updatedAt = Date.now();
    write({ ...cur });
  }, 1100);
}

export function deleteConversation(listingId: string) {
  const all = read();
  delete all[listingId];
  write(all);
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

let cache: Conversation[] = [];
let cacheKey = "";
function getSnapshot(): Conversation[] {
  const raw = localStorage.getItem(KEY) ?? "{}";
  if (raw === cacheKey) return cache;
  cacheKey = raw;
  cache = Object.values(read()).sort((a, b) => b.updatedAt - a.updatedAt);
  return cache;
}

export function useConversations(): Conversation[] {
  return useSyncExternalStore(subscribe, getSnapshot, () => []);
}

export function useConversation(listingId: string | null): Conversation | null {
  const all = useConversations();
  return listingId ? all.find((c) => c.listingId === listingId) ?? null : null;
}
