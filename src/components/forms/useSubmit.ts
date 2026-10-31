"use client";

import { useState } from "react";

export type Status = "idle" | "sending" | "sent" | "error";

export function useSubmit(kind: "contact" | "participation") {
  const [status, setStatus] = useState<Status>("idle");
  const [error, setError] = useState<string | null>(null);

  async function submit(form: HTMLFormElement) {
    setStatus("sending");
    setError(null);
    const fields = Object.fromEntries(new FormData(form).entries());
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ kind, fields }),
      });
      const data = await res.json().catch(() => ({}));
      if (!res.ok || !data.ok) throw new Error(data.error ?? "Something went wrong.");
      setStatus("sent");
      form.reset();
    } catch (e) {
      setError(e instanceof Error ? e.message : "Something went wrong.");
      setStatus("error");
    }
  }

  return { status, error, submit, reset: () => setStatus("idle") };
}
