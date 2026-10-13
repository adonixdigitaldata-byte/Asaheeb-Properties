import { NextRequest, NextResponse } from "next/server";
import { revalidatePath } from "next/cache";

/**
 * On-demand revalidation handler for Asaheeb Properties.
 *
 * Supports:
 * 1. GET: Manual one-click trigger via browser URL / bookmark
 *    Example: https://www.asaheebrealestate.com/api/revalidate?secret=YOUR_SECRET&path=/projects
 *
 * 2. POST: Supabase Database Webhook (automated on INSERT/UPDATE/DELETE)
 *    Webhook URL: https://www.asaheebrealestate.com/api/revalidate?secret=YOUR_SECRET
 */

const EXPECTED_SECRET =
  process.env.REVALIDATION_SECRET || "asaheeb_revalidate_secure_2026";

function isAuthorized(request: NextRequest): boolean {
  const secretParam = request.nextUrl.searchParams.get("secret");
  const authHeader = request.headers.get("authorization");
  const bearerToken = authHeader?.replace(/^Bearer\s+/i, "");

  return secretParam === EXPECTED_SECRET || bearerToken === EXPECTED_SECRET;
}

export async function GET(request: NextRequest) {
  if (!isAuthorized(request)) {
    return NextResponse.json(
      { message: "Unauthorized. Invalid or missing secret token." },
      { status: 401 }
    );
  }

  const path = request.nextUrl.searchParams.get("path") || "/projects";

  try {
    revalidatePath(path);
    // Always revalidate the main projects catalog and homepage if projects are affected
    if (path.startsWith("/projects")) {
      revalidatePath("/projects");
      revalidatePath("/");
    }

    return NextResponse.json({
      revalidated: true,
      path,
      timestamp: new Date().toISOString(),
    });
  } catch (error: any) {
    return NextResponse.json(
      { message: "Error revalidating", error: error?.message },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  if (!isAuthorized(request)) {
    return NextResponse.json(
      { message: "Unauthorized. Invalid or missing secret token." },
      { status: 401 }
    );
  }

  let body: any = null;
  try {
    body = await request.json();
  } catch {
    // Body is optional (e.g. empty POST)
  }

  const table = body?.table;
  const recordId = body?.record?.id || body?.old_record?.id;
  const revalidatedPaths: string[] = [];

  try {
    if (table === "blogs") {
      revalidatePath("/blog");
      revalidatedPaths.push("/blog");
      if (recordId) {
        revalidatePath(`/blog/${recordId}`);
        revalidatedPaths.push(`/blog/${recordId}`);
      }
    } else {
      // Default or projects table
      revalidatePath("/projects");
      revalidatePath("/");
      revalidatedPaths.push("/projects", "/");

      if (recordId) {
        revalidatePath(`/projects/${recordId}`);
        revalidatedPaths.push(`/projects/${recordId}`);
      }
    }

    return NextResponse.json({
      revalidated: true,
      table: table || "projects",
      recordId: recordId || null,
      paths: revalidatedPaths,
      timestamp: new Date().toISOString(),
    });
  } catch (error: any) {
    return NextResponse.json(
      { message: "Error revalidating", error: error?.message },
      { status: 500 }
    );
  }
}
