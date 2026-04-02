import { NextRequest, NextResponse } from "next/server";
import { normalizeWaitlistEmail } from "@/lib/waitlist";

/**
 * POST { "email": "..." }
 * Optional: set WAITLIST_WEBHOOK_URL to forward JSON { email, source } to your CRM / Zapier / etc.
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

    const webhook = process.env.WAITLIST_WEBHOOK_URL;
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
    } else if (process.env.NODE_ENV === "development") {
      console.info("[waitlist]", email);
    }

    return NextResponse.json({ ok: true });
  } catch {
    return NextResponse.json(
      { error: "Something went wrong. Please try again." },
      { status: 500 },
    );
  }
}
