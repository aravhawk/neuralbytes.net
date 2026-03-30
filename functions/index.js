const { onRequest } = require("firebase-functions/v2/https");
const admin = require("firebase-admin");

admin.initializeApp();
const db = admin.firestore();

const EMAIL_REGEX = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
const MAX_EMAIL_LENGTH = 254;

// Rate limiting: track IPs in memory (resets on cold start, but sufficient for basic protection)
const rateLimitMap = new Map();
const RATE_LIMIT_WINDOW_MS = 60 * 1000; // 1 minute
const RATE_LIMIT_MAX_REQUESTS = 5;

function isRateLimited(ip) {
  const now = Date.now();
  const entry = rateLimitMap.get(ip);

  if (!entry || now - entry.windowStart > RATE_LIMIT_WINDOW_MS) {
    rateLimitMap.set(ip, { windowStart: now, count: 1 });
    return false;
  }

  entry.count++;
  if (entry.count > RATE_LIMIT_MAX_REQUESTS) {
    return true;
  }

  return false;
}

exports.subscribe = onRequest(
  { cors: [/neuralbytes\.net$/, /localhost/] },
  async (req, res) => {
    // Only allow POST
    if (req.method !== "POST") {
      res.status(405).json({ error: "Method not allowed" });
      return;
    }

    // Rate limiting
    const clientIp =
      req.headers["x-forwarded-for"] || req.connection.remoteAddress;
    if (isRateLimited(clientIp)) {
      res.status(429).json({ error: "Too many requests. Please try again later." });
      return;
    }

    // Validate request body
    const { email } = req.body;
    if (!email || typeof email !== "string") {
      res.status(400).json({ error: "Email is required." });
      return;
    }

    const trimmedEmail = email.trim().toLowerCase();

    if (trimmedEmail.length > MAX_EMAIL_LENGTH) {
      res.status(400).json({ error: "Invalid email address." });
      return;
    }

    if (!EMAIL_REGEX.test(trimmedEmail)) {
      res.status(400).json({ error: "Please enter a valid email address." });
      return;
    }

    try {
      const docRef = db.collection("newsletter").doc("subscribers");
      const doc = await docRef.get();

      if (doc.exists) {
        const emails = doc.data().emails || [];

        // Check for duplicates
        if (emails.includes(trimmedEmail)) {
          res.status(200).json({ message: "Thanks for subscribing!" });
          return;
        }

        emails.push(trimmedEmail);
        emails.sort((a, b) => a.localeCompare(b));
        await docRef.update({ emails });
      } else {
        await docRef.set({ emails: [trimmedEmail] });
      }

      res.status(200).json({ message: "Thanks for subscribing!" });
    } catch (error) {
      console.error("Subscription error:", error);
      res.status(500).json({ error: "Something went wrong. Please try again." });
    }
  }
);
