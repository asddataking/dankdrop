/** Shared waitlist email rules for API + client hints. */
export const WAITLIST_EMAIL_MAX_LENGTH = 254;

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export function isValidWaitlistEmail(email: string): boolean {
  const t = email.trim().toLowerCase();
  if (!t || t.length > WAITLIST_EMAIL_MAX_LENGTH) return false;
  return EMAIL_PATTERN.test(t);
}

export function normalizeWaitlistEmail(raw: unknown): string | null {
  if (typeof raw !== "string") return null;
  const email = raw.trim().toLowerCase();
  if (!isValidWaitlistEmail(email)) return null;
  return email;
}
