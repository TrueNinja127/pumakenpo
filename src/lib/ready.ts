"use client";

import { useSyncExternalStore } from "react";

// Flipped by the Preloader once its curtain starts lifting, so intro animations aren't hidden behind it.
let ready = false;
const listeners = new Set<() => void>();

export function setReady() {
  if (ready) return;
  ready = true;
  listeners.forEach((l) => l());
}

export function useReady() {
  return useSyncExternalStore(
    (cb) => {
      listeners.add(cb);
      return () => listeners.delete(cb);
    },
    () => ready,
    () => false,
  );
}

// After a client-side navigation the page-transition curtain is still lifting;
// intro animations wait this long so they play as the page is uncovered.
let navigated = false;
export const markNavigated = () => {
  navigated = true;
};
export const introDelay = () => (navigated ? 0.45 : 0);
