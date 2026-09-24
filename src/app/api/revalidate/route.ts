import { revalidateTag } from "next/cache";
import { type NextRequest, NextResponse } from "next/server";
import { parseBody } from "next-sanity/webhook";
import { SANITY_TAG } from "@/lib/cms/client";
import { env } from "@/lib/env";

// Sanity webhook target: POST /api/revalidate (signed with SANITY_REVALIDATE_SECRET).
export async function POST(req: NextRequest) {
  if (!env.SANITY_REVALIDATE_SECRET) {
    return NextResponse.json({ message: "Revalidation is not configured" }, { status: 501 });
  }

  const { isValidSignature } = await parseBody(req, env.SANITY_REVALIDATE_SECRET);
  if (!isValidSignature) {
    return NextResponse.json({ message: "Invalid signature" }, { status: 401 });
  }

  revalidateTag(SANITY_TAG, "max");
  return NextResponse.json({ revalidated: true, now: Date.now() });
}
