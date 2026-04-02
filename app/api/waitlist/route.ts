import { NextRequest, NextResponse } from "next/server";
import { insertWaitlistSignup } from "@/lib/waitlist-db";
import { normalizeWaitlistEmail } from "@/lib/waitlist";

/**
 * POST { "email": "..." }
 *
 * Storage (in order):
 * - If `DATABASE_URL` is set (Neon): insert into `waitlist_signups` (duplicates ignored).
 * - If `WAITLIST_WEBHOOK_URL` is set: POST JSON payload after a successful DB write,
 *   or alone when no database is configured.
 */
export async function POST(req: NextRequest) {
  try {
    const body: unknown = await req.json();
    const parsed =
      body && typeof body === "object" && "email" in body
        ? (body as { email: unknown }).email
        : undefined;
    const email = normalizeWaitlistEmail(parsed);

    if (!email) {
      return NextResponse.json(
        { error: "Enter a valid email address." },
        { status: 400 },
      );
    }

    const hasDb = Boolean(process.env.DATABASE_URL?.trim());
    const webhook = process.env.WAITLIST_WEBHOOK_URL?.trim();

    if (hasDb) {
      try {
        await insertWaitlistSignup(email);
      } catch (e) {
        console.error("[waitlist] database error", e);
        return NextResponse.json(
          { error: "We couldn’t save your email. Try again shortly." },
          { status: 503 },
        );
      }
    }

    if (webhook) {
      const res = await fetch(webhook, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email,
          source: "dankdrops-landing",
          submittedAt: new Date().toISOString(),
        }),
      });
      if (!res.ok) {
        return NextResponse.json(
          { error: "We couldn’t save your email. Try again shortly." },
          { status: 502 },
        );
      }
    } else if (!hasDb && process.env.NODE_ENV === "development") {
      console.info("[waitlist] (no DATABASE_URL)", email);
    } else if (!hasDb) {
      return NextResponse.json(
        {
          error:
            "Waitlist is not configured. Set DATABASE_URL for Neon or WAITLIST_WEBHOOK_URL.",
        },
        { status: 503 },
      );
    }

    return NextResponse.json({ ok: true });
  } catch {
    return NextResponse.json(
      { error: "Something went wrong. Please try again." },
      { status: 500 },
    );
  }
}
