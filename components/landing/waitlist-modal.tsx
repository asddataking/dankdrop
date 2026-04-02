"use client";

import { AnimatePresence, motion } from "framer-motion";
import { X } from "lucide-react";
import { useCallback, useEffect, useId, useRef, useState } from "react";
import { isValidWaitlistEmail, WAITLIST_EMAIL_MAX_LENGTH } from "@/lib/waitlist";

type WaitlistModalProps = {
  open: boolean;
  onClose: () => void;
};

const ease = [0.16, 1, 0.3, 1] as const;

export function WaitlistModal({ open, onClose }: WaitlistModalProps) {
  const titleId = useId();
  const descId = useId();
  const inputRef = useRef<HTMLInputElement>(null);
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">(
    "idle",
  );
  const [message, setMessage] = useState("");

  const resetForm = useCallback(() => {
    setEmail("");
    setStatus("idle");
    setMessage("");
  }, []);

  useEffect(() => {
    if (!open) {
      const t = window.setTimeout(resetForm, 300);
      return () => window.clearTimeout(t);
    }
    const id = window.requestAnimationFrame(() => inputRef.current?.focus());
    return () => window.cancelAnimationFrame(id);
  }, [open, resetForm]);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    document.addEventListener("keydown", onKey);
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = prev;
    };
  }, [open, onClose]);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    const trimmed = email.trim();
    if (!isValidWaitlistEmail(trimmed)) {
      setStatus("error");
      setMessage("Enter a valid email address.");
      return;
    }

    setStatus("loading");
    setMessage("");

    try {
      const res = await fetch("/api/waitlist", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: trimmed }),
      });
      const data: unknown = await res.json().catch(() => ({}));
      const err =
        data && typeof data === "object" && "error" in data
          ? String((data as { error: unknown }).error)
          : "";

      if (!res.ok) {
        setStatus("error");
        setMessage(err || "Something went wrong. Try again.");
        return;
      }

      setStatus("success");
      setMessage("");
    } catch {
      setStatus("error");
      setMessage("Network error. Check your connection and try again.");
    }
  }

  return (
    <AnimatePresence>
      {open ? (
        <div className="fixed inset-0 z-[100] flex items-end justify-center p-4 sm:items-center">
          <motion.button
            type="button"
            aria-label="Close waitlist dialog"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="absolute inset-0 bg-black/75 backdrop-blur-sm"
            onClick={onClose}
          />

          <motion.div
            role="dialog"
            aria-modal="true"
            aria-labelledby={titleId}
            aria-describedby={descId}
            initial={{ opacity: 0, y: 24, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 16, scale: 0.98 }}
            transition={{ duration: 0.35, ease }}
            className="relative z-10 w-full max-w-md rounded-2xl border border-violet-500/25 bg-[#0d0d0f] p-6 shadow-[0_0_0_1px_rgba(139,92,246,0.08),0_32px_80px_-24px_rgba(0,0,0,0.9)]"
          >
            <div className="mb-6 flex items-start justify-between gap-4">
              <div>
                <h2
                  id={titleId}
                  className="text-lg font-semibold tracking-tight text-white"
                >
                  Join the waitlist
                </h2>
                <p id={descId} className="mt-1 text-sm text-zinc-500">
                  One email. We’ll notify you at launch—no spam.
                </p>
              </div>
              <button
                type="button"
                onClick={onClose}
                className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg border border-white/10 text-zinc-400 transition-colors hover:bg-white/5 hover:text-white focus:outline-none focus-visible:ring-2 focus-visible:ring-violet-500/50"
              >
                <X className="h-4 w-4" strokeWidth={2} aria-hidden />
                <span className="sr-only">Close</span>
              </button>
            </div>

            {status === "success" ? (
              <div className="rounded-xl border border-violet-500/20 bg-violet-950/25 px-4 py-5 text-center">
                <p className="text-sm font-medium text-violet-100">
                  You&apos;re on the list.
                </p>
                <p className="mt-2 text-xs text-zinc-500">
                  Watch your inbox for launch details.
                </p>
                <button
                  type="button"
                  onClick={onClose}
                  className="mt-5 w-full rounded-xl border border-white/15 bg-white/5 py-3 text-sm font-semibold text-white transition-colors hover:bg-white/10 focus:outline-none focus-visible:ring-2 focus-visible:ring-violet-500/45"
                >
                  Done
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4" noValidate>
                <div>
                  <label
                    htmlFor="waitlist-email"
                    className="mb-1.5 block text-xs font-medium uppercase tracking-wider text-zinc-500"
                  >
                    Email
                  </label>
                  <input
                    ref={inputRef}
                    id="waitlist-email"
                    name="email"
                    type="email"
                    autoComplete="email"
                    inputMode="email"
                    maxLength={WAITLIST_EMAIL_MAX_LENGTH}
                    placeholder="you@example.com"
                    value={email}
                    disabled={status === "loading"}
                    onChange={(e) => {
                      setEmail(e.target.value);
                      if (status === "error") {
                        setStatus("idle");
                        setMessage("");
                      }
                    }}
                    className="w-full rounded-xl border border-white/10 bg-black/40 px-4 py-3 text-sm text-white placeholder:text-zinc-600 focus:border-violet-500/50 focus:outline-none focus:ring-2 focus:ring-violet-500/30 disabled:opacity-60"
                  />
                </div>

                {status === "error" && message ? (
                  <p className="text-sm text-red-400" role="alert">
                    {message}
                  </p>
                ) : null}

                <button
                  type="submit"
                  disabled={status === "loading"}
                  className="w-full rounded-xl bg-gradient-to-b from-violet-500 to-fuchsia-600 py-3.5 text-sm font-semibold text-white shadow-[0_0_28px_-6px_rgba(139,92,246,0.5)] transition-opacity hover:opacity-95 focus:outline-none focus-visible:ring-2 focus-visible:ring-violet-400/60 focus-visible:ring-offset-2 focus-visible:ring-offset-[#0d0d0f] disabled:opacity-50"
                >
                  {status === "loading" ? "Joining…" : "Join waitlist"}
                </button>

                <p className="text-center text-[11px] text-zinc-600">
                  18+ where required. Unsubscribe anytime.
                </p>
              </form>
            )}
          </motion.div>
        </div>
      ) : null}
    </AnimatePresence>
  );
}
