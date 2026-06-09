"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { MessageSquare, Send, ShieldCheck, Trash2, ChevronLeft, ArrowLeft } from "lucide-react";
import { useConversations, sendMessage, deleteConversation } from "@/features/chat/chat-store";
import { CarImage } from "@/features/listings/car-image";
import { fmtPrice } from "@/lib/format";
import { cn } from "@/lib/utils";

export default function MessagesPage() {
  const conversations = useConversations();
  const [activeId, setActiveId] = useState<string | null>(null);
  const [text, setText] = useState("");
  const scrollRef = useRef<HTMLDivElement>(null);

  const active = conversations.find((c) => c.listingId === activeId) ?? null;

  useEffect(() => {
    if (!activeId && conversations.length) setActiveId(conversations[0].listingId);
  }, [conversations, activeId]);

  useEffect(() => {
    scrollRef.current?.scrollTo({ top: scrollRef.current.scrollHeight });
  }, [active?.messages.length, activeId]);

  const submit = () => {
    const t = text.trim();
    if (!t || !active) return;
    sendMessage(active.listingId, t);
    setText("");
  };

  return (
    <div className="mx-auto max-w-6xl px-4 py-6">
      <nav className="mb-4 flex items-center gap-1 text-xs text-muted-foreground">
        <Link href="/" className="hover:text-brand">Home</Link><ChevronLeft className="size-3 rotate-180" /> Messages
      </nav>
      <h1 className="mb-4 text-2xl font-bold tracking-tight">Messages</h1>

      {conversations.length === 0 ? (
        <div className="rounded-2xl border border-dashed py-24 text-center">
          <MessageSquare className="mx-auto size-9 text-muted-foreground" strokeWidth={1.5} />
          <p className="mt-3 text-base font-semibold">No conversations yet</p>
          <p className="mt-1 text-sm text-muted-foreground">Message a seller from any car listing to start chatting.</p>
          <Link href="/cars" className="mt-4 inline-flex text-sm font-semibold text-brand hover:underline">Browse cars</Link>
        </div>
      ) : (
        <div className="grid h-[70vh] overflow-hidden rounded-2xl border bg-card ring-1 ring-foreground/5 md:grid-cols-[300px_1fr]">
          {/* List */}
          <div className={cn("flex-col border-r md:flex", active ? "hidden md:flex" : "flex")}>
            <div className="overflow-y-auto">
              {conversations.map((c) => {
                const last = c.messages[c.messages.length - 1];
                return (
                  <button
                    key={c.listingId}
                    onClick={() => setActiveId(c.listingId)}
                    className={cn("flex w-full items-center gap-3 border-b px-3 py-3 text-left transition-colors hover:bg-muted", activeId === c.listingId && "bg-accent")}
                  >
                    <div className="relative size-12 shrink-0 overflow-hidden rounded-lg bg-muted">
                      <CarImage src={c.image} alt={c.title} sizes="48px" />
                    </div>
                    <div className="min-w-0 flex-1">
                      <div className="truncate text-sm font-semibold">{c.sellerName}</div>
                      <div className="truncate text-xs text-muted-foreground">{c.title}</div>
                      <div className="truncate text-xs text-muted-foreground/80">{last ? `${last.from === "me" ? "You: " : ""}${last.text}` : "—"}</div>
                    </div>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Thread */}
          {active ? (
            <div className="flex flex-col">
              <header className="flex items-center gap-3 border-b px-4 py-3">
                <button onClick={() => setActiveId(null)} className="md:hidden" aria-label="Back"><ArrowLeft className="size-5" /></button>
                <div className="relative size-10 shrink-0 overflow-hidden rounded-lg bg-muted">
                  <CarImage src={active.image} alt={active.title} sizes="40px" />
                </div>
                <div className="min-w-0 flex-1">
                  <div className="truncate text-sm font-semibold">{active.sellerName}</div>
                  <Link href={`/cars/${active.slug}`} className="truncate text-xs text-brand hover:underline">{active.title}</Link>
                </div>
                <span className="text-sm font-bold tnum">{fmtPrice(active.price)}</span>
                <button
                  onClick={() => { deleteConversation(active.listingId); setActiveId(null); }}
                  aria-label="Delete conversation"
                  className="grid size-8 place-items-center rounded-lg text-muted-foreground hover:bg-muted hover:text-destructive"
                >
                  <Trash2 className="size-4" />
                </button>
              </header>

              <div ref={scrollRef} className="flex-1 space-y-3 overflow-y-auto bg-muted/30 p-4">
                <p className="mx-auto w-fit rounded-full bg-card px-3 py-1 text-xs text-muted-foreground ring-1 ring-border">
                  Conversation about the {active.title}
                </p>
                {active.messages.map((m) => (
                  <div key={m.id} className={cn("flex", m.from === "me" ? "justify-end" : "justify-start")}>
                    <div className={cn("max-w-[70%] rounded-2xl px-3.5 py-2 text-sm", m.from === "me" ? "rounded-br-sm bg-brand text-brand-foreground" : "rounded-bl-sm bg-card ring-1 ring-border")}>
                      {m.text}
                    </div>
                  </div>
                ))}
              </div>

              <div className="border-t p-3">
                <div className="flex items-end gap-2">
                  <textarea
                    value={text}
                    onChange={(e) => setText(e.target.value)}
                    onKeyDown={(e) => { if (e.key === "Enter" && !e.shiftKey) { e.preventDefault(); submit(); } }}
                    rows={1}
                    placeholder="Write a message…"
                    className="max-h-28 flex-1 resize-none rounded-xl border border-input bg-card px-3 py-2 text-sm outline-none focus:border-ring focus:ring-3 focus:ring-ring/30"
                  />
                  <button onClick={submit} disabled={!text.trim()} aria-label="Send" className="grid size-10 shrink-0 place-items-center rounded-xl bg-primary text-primary-foreground disabled:opacity-40">
                    <Send className="size-4" />
                  </button>
                </div>
                <p className="mt-1.5 flex items-center justify-center gap-1 text-[11px] text-muted-foreground">
                  <ShieldCheck className="size-3 text-success" /> Protected by AussieWheels secure messaging
                </p>
              </div>
            </div>
          ) : (
            <div className="hidden place-items-center text-sm text-muted-foreground md:grid">Select a conversation</div>
          )}
        </div>
      )}
    </div>
  );
}
