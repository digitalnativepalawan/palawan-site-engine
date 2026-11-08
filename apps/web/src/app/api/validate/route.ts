import { NextResponse } from "next/server";
import { validateSite } from "@palawan-site-engine/engine";
import { buildResort01Manifest, resort01Template, getDemoProfile } from "@palawan-site-engine/templates";

const APP_CONFIG = { modules: { inquiry: true, booking: false }, settings: {} };

export async function POST(req: Request) {
  let body: unknown;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ ok: false, issues: [{ path: "$", code: "invalid_json", message: "Request body is not valid JSON" }] }, { status: 400 });
  }
  const profile = (body as { profile?: unknown }).profile ?? getDemoProfile("amihan");
  const manifest =
    (body as { manifest?: unknown }).manifest ?? buildResort01Manifest("lagoon", "editorial");
  const res = validateSite(profile, manifest, APP_CONFIG, resort01Template);
  return NextResponse.json(res, { status: res.ok ? 200 : 422 });
}
