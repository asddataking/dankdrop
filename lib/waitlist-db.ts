import { neon } from "@neondatabase/serverless";

const SOURCE = "dankdrops-landing";

/**
 * Persists a waitlist email when `DATABASE_URL` (Neon) is set.
 * Duplicate emails are ignored (unique constraint); still treated as success.
 */
export async function insertWaitlistSignup(email: string): Promise<void> {
  const url = process.env.DATABASE_URL;
  if (!url) {
    throw new Error("DATABASE_URL is not configured");
  }

  const sql = neon(url);
  await sql`
    INSERT INTO waitlist_signups (email, source)
    VALUES (${email}, ${SOURCE})
    ON CONFLICT (email) DO NOTHING
  `;
}
