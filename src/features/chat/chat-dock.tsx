"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { MessageSquare, X, ChevronLeft, Send, ShieldCheck, Maximize2 } from "lucide-react";
import {
  useConversations, useConversation, openConversation, sendMessage, type Conversation,
} from "./chat-store";
import { CarImage } from "@/features/listings/car-image";
import { fmtPrice } from "@/lib/format";
import { cn } from "@/lib/utils";

export type OpenChatDetail = Omit<Conversation, "messages" | "updatedAt"> & { initialMessage?: string };

/** Fire from anywhere to open a conversation with a seller. */
export function openChat(detail: OpenChatDetail) {
  window.dispatchEvent(new CustomEvent<OpenChatDetail>("aw:open-chat", { detail }));
}

export function ChatDock() {
  const [open, setOpen] = useState(false);
  const [activeId, setActiveId] = useState<string | null>(null);
  const conversations = useConversations();

  useEffect(() => {
    const handler = (e: Event) => {
      const d = (e as CustomEvent<OpenChatDetail>).detail;
      const { initialMessage, ...meta } = d;
      openConversation(meta);
      if (initialMessage) sendMessage(meta.listingId, initialMessage);
      setActiveId(meta.listingId);
      setOpen(true);
    };
    window.addEventListener("aw:open-chat", handler);
    return () => window.removeEventListener("aw:open-chat", handler);
  }, []);

  const active = conversations.find((c) => c.listingId === activeId) ?? null;
  const totalUnread = conversations.length;

  return (
    <>
      {/* Launcher */}
      <button
        onClick={() => setOpen((o) => !o)}
        aria-label="Messages"
        className="fixed bottom-4 right-4 z-50 grid size-13 place-items-center rounded-full bg-primary text-primary-foreground shadow-xl ring-1 ring-black/10 transition-transform hover:scale-105 sm:size-14"
      >
        {open ? <X className="size-6" /> : <MessageSquare className="size-6" />}
        {!open && totalUnread > 0 && (
          <span className="absolute -right-0.5 -top-0.5 grid size-5 place-items-center rounded-full bg-brand text-[10px] font-bold text-white ring-2 ring-background">
            {totalUnread}
          </span>
        )}
      </button>

      {/* Panel */}
      {open && (
        <div className="fixed bottom-20 right-4 z-50 flex h-[32rem] max-h-[calc(100vh-6rem)] w-[calc(100vw-2rem)] max-w-sm flex-col overflow-hidden rounded-2xl border bg-card shadow-2xl ring-1 ring-foreground/10">
          {active ? (
            <Thread conversation={active} onBack={() => setActiveId(null)} />
          ) : (
            <ConversationList conversations={conversations} onOpen={setActiveId} onClose={() => setOpen(false)} />
          )}
        </div>
      )}
    </>
  );
}

function ConversationList({
  conversations, onOpen, onClose,
}: {
  conversations: Conversation[]; onOpen: (id: string) => void; onClose: () => void;
}) {
  return (
    <>
      <header className="flex items-center justify-between border-b bg-primary px-4 py-3 text-primary-foreground">
        <div className="flex items-center gap-2">
          <MessageSquare className="size-4.5" />
          <span className="font-semibold">Messages</span>
        </div>
        <button onClick={onClose} aria-label="Close"><X className="size-4.5" /></button>
      </header>
      <div className="flex-1 overflow-y-auto">
        {conversations.length === 0 ? (
          <div className="flex h-full flex-col items-center justify-center gap-2 p-6 text-center">
            <MessageSquare className="size-8 text-muted-foreground" strokeWidth={1.5} />
            <p className="text-sm font-medium">No messages yet</p>
            <p className="text-xs text-muted-foreground">Message a seller from any listing to start a conversation.</p>
          </div>
        ) : (
          conversations.map((c) => {
            const last = c.messages[c.messages.length - 1];
            return (
              <button key={c.listingId} onClick={() => onOpen(c.listingId)} className="flex w-full items-center gap-3 border-b px-3 py-3 text-left transition-colors hover:bg-muted">
                <div className="relative size-11 shrink-0 overflow-hidden rounded-lg bg-muted">
                  <CarImage src={c.image} alt={c.title} sizes="44px" />
                </div>
                <div className="min-w-0 flex-1">
                  <div className="truncate text-sm font-semibold">{c.sellerName}</div>
                  <div className="truncate text-xs text-muted-foreground">{last ? `${last.from === "me" ? "You: " : ""}${last.text}` : c.title}</div>
                </div>
              </button>
            );
          })
        )}
      </div>
      <Link href="/messages" className="flex items-center justify-center gap-1.5 border-t py-2.5 text-xs font-semibold text-brand hover:underline">
        <Maximize2 className="size-3.5" /> Open full inbox
      </Link>
    </>
  );
}

function Thread({ conversation, onBack }: { conversation: Conversation; onBack: () => void }) {
  const [text, setText] = useState("");
  const conv = useConversation(conversation.listingId) ?? conversation;
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    scrollRef.current?.scrollTo({ top: scrollRef.current.scrollHeight, behavior: "smooth" });
  }, [conv.messages.length]);

  const submit = () => {
    const t = text.trim();
    if (!t) return;
    sendMessage(conv.listingId, t);
    setText("");
  };

  return (
    <>
      <header className="flex items-center gap-2 border-b bg-primary px-3 py-2.5 text-primary-foreground">
        <button onClick={onBack} aria-label="Back" className="grid size-7 place-items-center rounded-full hover:bg-white/15"><ChevronLeft className="size-4.5" /></button>
        <div className="relative size-9 shrink-0 overflow-hidden rounded-lg bg-white/10">
          <CarImage src={conv.image} alt={conv.title} sizes="36px" />
        </div>
        <div className="min-w-0 flex-1">
          <div className="truncate text-sm font-semibold">{conv.sellerName}</div>
          <Link href={`/cars/${conv.slug}`} className="truncate text-[11px] text-primary-foreground/75 hover:underline">{conv.title}</Link>
        </div>
        <span className="shrink-0 text-sm font-bold tnum">{fmtPrice(conv.price)}</span>
      </header>

      <div ref={scrollRef} className="flex-1 space-y-2.5 overflow-y-auto bg-muted/30 p-3">
        <p className="mx-auto w-fit rounded-full bg-card px-3 py-1 text-[11px] text-muted-foreground ring-1 ring-border">
          You&apos;re messaging about the {conv.title}
        </p>
        {conv.messages.map((m) => (
          <div key={m.id} className={cn("flex", m.from === "me" ? "justify-end" : "justify-start")}>
            <div className={cn("max-w-[78%] rounded-2xl px-3 py-2 text-sm", m.from === "me" ? "rounded-br-sm bg-brand text-brand-foreground" : "rounded-bl-sm bg-card ring-1 ring-border")}>
              {m.text}
            </div>
          </div>
        ))}
      </div>

      <div className="border-t p-2.5">
        <div className="flex items-end gap-2">
          <textarea
            value={text}
            onChange={(e) => setText(e.target.value)}
            onKeyDown={(e) => { if (e.key === "Enter" && !e.shiftKey) { e.preventDefault(); submit(); } }}
            rows={1}
            placeholder="Write a message…"
            className="max-h-24 flex-1 resize-none rounded-xl border border-input bg-card px-3 py-2 text-sm outline-none focus:border-ring focus:ring-3 focus:ring-ring/30"
          />
          <button onClick={submit} disabled={!text.trim()} aria-label="Send" className="grid size-9 shrink-0 place-items-center rounded-xl bg-primary text-primary-foreground transition-opacity disabled:opacity-40">
            <Send className="size-4" />
          </button>
        </div>
        <p className="mt-1.5 flex items-center justify-center gap-1 text-[10px] text-muted-foreground">
          <ShieldCheck className="size-3 text-success" /> Protected by AussieWheels secure messaging
        </p>
      </div>
    </>
  );
}
