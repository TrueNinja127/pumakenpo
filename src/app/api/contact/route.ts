import { NextResponse } from "next/server";

type Payload = { kind?: string; fields?: Record<string, unknown> };

const esc = (s: string) => s.replace(/[&<>"]/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" })[c]!);

/**
 * Receives the contact and participation forms.
 * Set RESEND_API_KEY (and optionally CONTACT_TO / CONTACT_FROM) to deliver submissions by email;
 * without it, submissions are only logged on the server.
 */
export async function POST(req: Request) {
  let body: Payload;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ ok: false, error: "Invalid request" }, { status: 400 });
  }

  const fields = Object.fromEntries(
    Object.entries(body.fields ?? {})
      .filter(([, v]) => typeof v === "string")
      .map(([k, v]) => [k.slice(0, 80), (v as string).trim().slice(0, 4000)]),
  ) as Record<string, string>;

  const email = fields.email ?? "";
  const name = fields.name ?? [fields.firstName, fields.lastName].filter(Boolean).join(" ");
  if (!name || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return NextResponse.json({ ok: false, error: "Please provide your name and a valid email." }, { status: 422 });
  }
  if (fields.company) return NextResponse.json({ ok: true }); // honeypot

  const kind = body.kind === "participation" ? "Participation Form" : "Contact Form";
  const key = process.env.RESEND_API_KEY;

  if (!key) {
    console.info(`[${kind}] submission`, fields);
    return NextResponse.json({ ok: true });
  }

  const rows = Object.entries(fields)
    .filter(([k, v]) => v && k !== "company")
    .map(([k, v]) => `<tr><td style="padding:4px 12px 4px 0;color:#666">${esc(k)}</td><td>${esc(v).replace(/\n/g, "<br>")}</td></tr>`)
    .join("");

  const res = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: { Authorization: `Bearer ${key}`, "Content-Type": "application/json" },
    body: JSON.stringify({
      from: process.env.CONTACT_FROM ?? "Puma Academy Website <onboarding@resend.dev>",
      to: [process.env.CONTACT_TO ?? "contact@pumakenpo.com"],
      reply_to: email,
      subject: `${kind}: ${name}`,
      html: `<h2>${kind}</h2><table>${rows}</table>`,
    }),
  });

  if (!res.ok) {
    console.error(`[${kind}] email failed`, res.status, await res.text());
    return NextResponse.json({ ok: false, error: "We couldn't send your message. Please call or email us directly." }, { status: 502 });
  }
  return NextResponse.json({ ok: true });
}
