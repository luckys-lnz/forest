import { NextResponse } from "next/server";
import { forward, readJson } from "@/lib/server/forward";
import { EMAIL_HINT, isEmail } from "@/lib/validation";

type Body = { email: string; source: string };

/** Newsletter sign-up, forwarded to NEWSLETTER_WEBHOOK_URL. */
export async function POST(request: Request) {
  const body = await readJson<Body>(request);
  if (!body.ok) return NextResponse.json({ error: body.error }, { status: 400 });

  const email = body.value.email?.trim() ?? "";
  if (!isEmail(email)) return NextResponse.json({ error: EMAIL_HINT }, { status: 422 });

  const sent = await forward("NEWSLETTER_WEBHOOK_URL", {
    email,
    source: String(body.value.source ?? "unknown").slice(0, 60),
    at: new Date().toISOString(),
  });
  if (!sent.ok) return NextResponse.json({ error: "We couldn't sign you up just now. Try again in a minute." }, { status: 502 });
  return NextResponse.json({ ok: true });
}
