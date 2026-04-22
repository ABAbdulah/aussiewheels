"use client";

import { useEffect, useRef, useState } from "react";
import { Bell, Car, Heart, TrendingDown, MessageSquare, X } from "lucide-react";

type Notification = {
  id: string;
  icon: React.ReactNode;
  title: string;
  body: string;
  time: string;
  read: boolean;
};

const MOCK_NOTIFICATIONS: Notification[] = [
  {
    id: "1",
    icon: <TrendingDown className="size-4 text-emerald-600" strokeWidth={1.5} />,
    title: "Price drop",
    body: "2024 Toyota RAV4 you saved dropped to $42,990",
    time: "2 min ago",
    read: false,
  },
  {
    id: "2",
    icon: <Car className="size-4 text-primary" strokeWidth={1.5} />,
    title: "New listing match",
    body: "3 new SUVs under $35k in Sydney match your search",
    time: "1 hr ago",
    read: false,
  },
  {
    id: "3",
    icon: <Heart className="size-4 text-rose-500" strokeWidth={1.5} />,
    title: "Saved listing update",
    body: "2023 Mazda CX-5 has been sold",
    time: "Yesterday",
    read: true,
  },
  {
    id: "4",
    icon: <MessageSquare className="size-4 text-sky-500" strokeWidth={1.5} />,
    title: "Message from seller",
    body: "Hi, the car is still available. Happy to arrange…",
    time: "2 days ago",
    read: true,
  },
];

export function NotificationBell() {
  const [open, setOpen] = useState(false);
  const [notifications, setNotifications] = useState(MOCK_NOTIFICATIONS);
  const ref = useRef<HTMLDivElement>(null);

  const unreadCount = notifications.filter((n) => !n.read).length;

  useEffect(() => {
    function onMouseDown(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        setOpen(false);
      }
    }
    function onKeyDown(e: KeyboardEvent) {
      if (e.key === "Escape") setOpen(false);
    }
    document.addEventListener("mousedown", onMouseDown);
    document.addEventListener("keydown", onKeyDown);
    return () => {
      document.removeEventListener("mousedown", onMouseDown);
      document.removeEventListener("keydown", onKeyDown);
    };
  }, []);

  function markAllRead() {
    setNotifications((prev) => prev.map((n) => ({ ...n, read: true })));
  }

  return (
    <div ref={ref} className="relative">
      <button
        aria-label={`Notifications${unreadCount > 0 ? ` (${unreadCount} unread)` : ""}`}
        aria-expanded={open}
        aria-haspopup="dialog"
        onClick={() => setOpen((v) => !v)}
        className="relative flex size-8 items-center justify-center rounded-lg transition-colors hover:bg-muted"
      >
        <Bell className="size-4.5 text-foreground/70" strokeWidth={1.5} />
        {unreadCount > 0 && (
          <span className="absolute right-1 top-1 flex size-4 items-center justify-center rounded-full bg-primary text-[10px] font-medium text-primary-foreground leading-none">
            {unreadCount}
          </span>
        )}
      </button>

      {open && (
        <div
          role="dialog"
          aria-label="Notifications"
          className="absolute right-0 top-[calc(100%+8px)] z-50 w-80 overflow-hidden rounded-xl border bg-background shadow-xl shadow-black/10"
        >
          {/* Header */}
          <div className="flex items-center justify-between border-b px-4 py-3">
            <span className="text-sm font-medium">Notifications</span>
            <div className="flex items-center gap-2">
              {unreadCount > 0 && (
                <button
                  onClick={markAllRead}
                  className="text-xs text-primary hover:underline"
                >
                  Mark all read
                </button>
              )}
              <button
                onClick={() => setOpen(false)}
                className="flex size-6 items-center justify-center rounded-md hover:bg-muted text-muted-foreground"
                aria-label="Close"
              >
                <X className="size-3.5" />
              </button>
            </div>
          </div>

          {/* List */}
          <ul className="max-h-[340px] divide-y overflow-y-auto">
            {notifications.map((n) => (
              <li
                key={n.id}
                className={`flex gap-3 px-4 py-3.5 transition-colors hover:bg-muted/50 ${n.read ? "opacity-60" : ""}`}
              >
                <div className="mt-0.5 flex size-7 shrink-0 items-center justify-center rounded-full bg-muted">
                  {n.icon}
                </div>
                <div className="min-w-0">
                  <p className="text-xs font-medium leading-snug">{n.title}</p>
                  <p className="mt-0.5 line-clamp-2 text-xs font-light text-muted-foreground leading-snug">
                    {n.body}
                  </p>
                  <p className="mt-1 text-[11px] text-muted-foreground/70">{n.time}</p>
                </div>
                {!n.read && (
                  <span className="mt-1.5 size-1.5 shrink-0 rounded-full bg-primary" />
                )}
              </li>
            ))}
          </ul>

          {/* Footer */}
          <div className="border-t px-4 py-2.5 text-center">
            <button className="text-xs text-primary hover:underline">
              View all notifications
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
