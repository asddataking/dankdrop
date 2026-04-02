"use client";

import { WaitlistProvider } from "./waitlist-provider";

export function LandingShell({ children }: { children: React.ReactNode }) {
  return <WaitlistProvider>{children}</WaitlistProvider>;
}
