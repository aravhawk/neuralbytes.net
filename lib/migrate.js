const { neon } = require("@neondatabase/serverless");

async function migrate() {
  if (!process.env.DATABASE_URL) {
    console.error("DATABASE_URL environment variable is not set.");
    console.error("Set it in .env.local or run: export DATABASE_URL=your_connection_string");
    process.exit(1);
  }

  const sql = neon(process.env.DATABASE_URL);

  await sql`
    CREATE TABLE IF NOT EXISTS subscribers (
      id SERIAL PRIMARY KEY,
      email TEXT UNIQUE NOT NULL,
      subscribed_at TIMESTAMPTZ DEFAULT NOW()
    )
  `;

  await sql`
    CREATE INDEX IF NOT EXISTS idx_subscribers_email ON subscribers (email)
  `;

  console.log("Migration complete: subscribers table is ready.");
}

migrate().catch((err) => {
  console.error("Migration failed:", err);
  process.exit(1);
});
