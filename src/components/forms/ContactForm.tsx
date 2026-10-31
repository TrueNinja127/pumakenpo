"use client";

import { AnimatePresence, motion } from "motion/react";
import { CheckCircle2, Loader2 } from "lucide-react";
import Button from "../ui/Button";
import { useSubmit } from "./useSubmit";

export default function ContactForm() {
  const { status, error, submit, reset } = useSubmit("contact");

  return (
    <div className="relative">
      <AnimatePresence mode="wait">
        {status === "sent" ? (
          <motion.div
            key="sent"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0 }}
            className="flex flex-col items-center justify-center gap-4 rounded-[1.5rem] border border-puma/40 bg-puma/[0.06] px-8 py-16 text-center"
          >
            <motion.span initial={{ scale: 0, rotate: -90 }} animate={{ scale: 1, rotate: 0 }} transition={{ type: "spring", stiffness: 260, damping: 16, delay: 0.1 }}>
              <CheckCircle2 className="h-16 w-16 text-puma" />
            </motion.span>
            <p className="font-display text-4xl uppercase">Message sent!</p>
            <p className="max-w-sm text-mute">Thanks for reaching out — we&apos;ll get back to you shortly.</p>
            <button onClick={reset} className="mt-2 text-sm font-semibold uppercase tracking-widest text-puma hover:underline">
              Send another
            </button>
          </motion.div>
        ) : (
          <motion.form
            key="form"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onSubmit={(e) => {
              e.preventDefault();
              submit(e.currentTarget);
            }}
            className="grid gap-4 sm:grid-cols-2"
          >
            <input type="text" name="company" tabIndex={-1} autoComplete="off" className="hidden" aria-hidden />
            <label className="sm:col-span-1">
              <span className="sr-only">Full Name</span>
              <input required name="name" placeholder="Full Name *" autoComplete="name" className="field" />
            </label>
            <label>
              <span className="sr-only">Email Address</span>
              <input required type="email" name="email" placeholder="Email Address *" autoComplete="email" className="field" />
            </label>
            <label>
              <span className="sr-only">Phone Number</span>
              <input type="tel" name="phone" placeholder="Phone Number" autoComplete="tel" className="field" />
            </label>
            <label>
              <span className="sr-only">What may we assist you with?</span>
              <select name="topic" defaultValue="" className="field">
                <option value="" disabled>
                  What may we assist you with?
                </option>
                <option>Membership</option>
                <option>General Information</option>
                <option>Other</option>
              </select>
            </label>
            <label className="sm:col-span-2">
              <span className="sr-only">Message</span>
              <textarea name="message" rows={5} placeholder="Your message" className="field resize-none" />
            </label>
            {error && <p className="text-sm text-puma-300 sm:col-span-2">{error}</p>}
            <div className="sm:col-span-2">
              <Button type="submit" disabled={status === "sending"} icon={status !== "sending"}>
                {status === "sending" ? (
                  <span className="flex items-center gap-2">
                    <Loader2 className="h-4 w-4 animate-spin" /> Sending
                  </span>
                ) : (
                  "Send Message"
                )}
              </Button>
            </div>
          </motion.form>
        )}
      </AnimatePresence>
    </div>
  );
}
