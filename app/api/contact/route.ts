import { NextResponse } from "next/server";
import { topics, validateContact, type ContactInput, type TopicId } from "@/lib/contact";
import { forward, readJson } from "@/lib/server/forward";
import { hasErrors } from "@/lib/types";

const trimOrUndefined = (v: string | undefined) => v?.trim() || undefined;

/** Contact messages: same validation as the form, then forwarded to CONTACT_WEBHOOK_URL. */
export async function POST(request: Request) {
  const body = await readJson<ContactInput>(request);
  if (!body.ok) return NextResponse.json({ error: body.error }, { status: 400 });
  const input = body.value as ContactInput;
  const reference = `FC-${Date.now().toString(36).toUpperCase().slice(-6)}`;

  // Bots fill the honeypot. Pretend it worked; send nothing.
  if (input.nickname) return NextResponse.json({ reference });

  const errors = validateContact(input);
  if (hasErrors(errors)) {
    return NextResponse.json({ error: "Fix the highlighted fields to send your message.", errors }, { status: 422 });
  }

  const sent = await forward("CONTACT_WEBHOOK_URL", {
    reference,
    topic: topics[input.topic as TopicId].label,
    name: input.name.trim(),
    email: input.email.trim(),
    message: input.message.trim(),
    orderNumber: trimOrUndefined(input.orderNumber),
    company: trimOrUndefined(input.company),
    website: trimOrUndefined(input.website),
    outlet: trimOrUndefined(input.outlet),
    deadline: trimOrUndefined(input.deadline),
    receivedAt: new Date().toISOString(),
  });
  if (!sent.ok) {
    return NextResponse.json(
      { error: "We couldn't deliver your message just now. Try again in a few minutes, or email hello@forest.food." },
      { status: 502 },
    );
  }
  return NextResponse.json({ reference });
}
