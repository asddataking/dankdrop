-- Waitlist storage (Neon). Applied via Neon MCP / console; kept for reference.
CREATE TABLE IF NOT EXISTS waitlist_signups (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  email VARCHAR(254) NOT NULL,
  source VARCHAR(64) NOT NULL DEFAULT 'dankdrops-landing',
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  CONSTRAINT waitlist_signups_email_key UNIQUE (email)
);

CREATE INDEX IF NOT EXISTS waitlist_signups_created_at_idx ON waitlist_signups (created_at DESC);
