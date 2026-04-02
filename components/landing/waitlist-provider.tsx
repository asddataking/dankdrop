"use client";

import {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useState,
} from "react";
import { WaitlistModal } from "./waitlist-modal";

type WaitlistContextValue = {
  openWaitlist: () => void;
  closeWaitlist: () => void;
};

const WaitlistContext = createContext<WaitlistContextValue | null>(null);

export function useWaitlist(): WaitlistContextValue {
  const ctx = useContext(WaitlistContext);
  if (!ctx) {
    throw new Error("useWaitlist must be used within WaitlistProvider");
  }
  return ctx;
}

export function WaitlistProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [open, setOpen] = useState(false);

  const openWaitlist = useCallback(() => setOpen(true), []);
  const closeWaitlist = useCallback(() => setOpen(false), []);

  const value = useMemo(
    () => ({ openWaitlist, closeWaitlist }),
    [openWaitlist, closeWaitlist],
  );

  return (
    <WaitlistContext.Provider value={value}>
      {children}
      <WaitlistModal open={open} onClose={closeWaitlist} />
    </WaitlistContext.Provider>
  );
}
