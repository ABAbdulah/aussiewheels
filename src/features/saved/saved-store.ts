"use client";

import { useSyncExternalStore } from "react";
import type { Listing } from "@/lib/api";

// Saved/shortlisted cars, persisted in localStorage (no auth backend yet).
const KEY = "aw:saved";
const EVT = "aw:saved-changed";

function read(): Record<string, Listing> {
  if (typeof window === "undefined") return {};
  try {
    return JSON.parse(localStorage.getItem(KEY) ?? "{}");
  } catch {
    return {};
  }
}

function write(data: Record<string, Listing>) {
  localStorage.setItem(KEY, JSON.stringify(data));
  window.dispatchEvent(new Event(EVT));
}

/** Toggle a listing's saved state. Returns the new saved value. */
export function toggleSaved(listing: Listing): boolean {
  const all = read();
  const next = !all[listing.id];
  if (next) all[listing.id] = listing;
  else delete all[listing.id];
  write(all);
  return next;
}

function subscribe(cb: () => void) {
  window.addEventListener(EVT, cb);
  window.addEventListener("storage", cb);
  return () => {
    window.removeEventListener(EVT, cb);
    window.removeEventListener("storage", cb);
  };
}

let cache: Listing[] = [];
let cacheKey = "";
function getSnapshot(): Listing[] {
  const raw = localStorage.getItem(KEY) ?? "{}";
  if (raw === cacheKey) return cache;
  cacheKey = raw;
  cache = Object.values(read());
  return cache;
}

export function useSaved(): Listing[] {
  return useSyncExternalStore(subscribe, getSnapshot, () => []);
}

export function useIsSaved(id: string): boolean {
  return useSaved().some((l) => l.id === id);
}
