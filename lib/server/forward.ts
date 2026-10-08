import { err, ok, type Result } from "../types";

type Hook = "CONTACT_WEBHOOK_URL" | "NEWSLETTER_WEBHOOK_URL";

/**
 * Deliver a payload to the integration configured in `env` (helpdesk, email
 * platform, automation). Without one configured, log it so nothing is
 * silently lost in development. Never throws.
 */
export async function forward(env: Hook, payload: Record<string, unknown>): Promise<Result<"sent" | "logged">> {
  const url = process.env[env];
  if (!url) {
    console.info(`[${env}] not set; logged only`, payload);
    return ok("logged");
  }
  try {
    const res = await fetch(url, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });
    return res.ok ? ok("sent") : err(`Upstream responded ${res.status}`);
  } catch (e) {
    return err(e instanceof Error ? e.message : "Network error");
  }
}

/** Parse a JSON body without letting a malformed request throw. */
export async function readJson<T>(request: Request): Promise<Result<Partial<T>>> {
  try {
    return ok((await request.json()) as Partial<T>);
  } catch {
    return err("Send the form as JSON.");
  }
}
