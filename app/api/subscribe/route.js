import { getDb } from "@/lib/db";
import { NextResponse } from "next/server";

const EMAIL_REGEX = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
const MAX_EMAIL_LENGTH = 254;

export async function POST(request) {
  let body;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid request body." }, { status: 400 });
  }

  const { email } = body;

  if (!email || typeof email !== "string") {
    return NextResponse.json({ error: "Email is required." }, { status: 400 });
  }

  const trimmedEmail = email.trim().toLowerCase();

  if (trimmedEmail.length > MAX_EMAIL_LENGTH || !EMAIL_REGEX.test(trimmedEmail)) {
    return NextResponse.json({ error: "Please enter a valid email address." }, { status: 400 });
  }

  try {
    const sql = getDb();

    const result = await sql`
      INSERT INTO subscribers (email)
      VALUES (${trimmedEmail})
      ON CONFLICT (email) DO NOTHING
      RETURNING id
    `;

    if (result.length === 0) {
      return NextResponse.json({ message: "You're already subscribed!" }, { status: 409 });
    }

    return NextResponse.json({ message: "Thanks for subscribing!" });
  } catch (error) {
    console.error("Subscription error:", error);
    return NextResponse.json({ error: "Something went wrong. Please try again." }, { status: 500 });
  }
}
