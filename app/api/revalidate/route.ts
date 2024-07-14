import { revalidatePath, revalidateTag } from "next/cache";
import { NextRequest } from "next/server";

function getType(path: string) {
  if (path === "/" || path.endsWith("]")) return "layout";
  return "page";
}

// https://nextjs.org/docs/app/api-reference/functions/revalidatePath#route-handler
export async function GET(request: NextRequest) {
  const path = request.nextUrl.searchParams.get("path");

  if (path) {
    revalidatePath(path, getType(path));
    return Response.json({ revalidated: true, now: Date.now() });
  }

  const tag = request.nextUrl.searchParams.get("tag");

  if (tag) {
    revalidateTag(tag);
    return Response.json({ revalidated: true, now: Date.now() });
  }

  return Response.json({
    revalidated: false,
    now: Date.now(),
    message: "Missing path/tag to revalidate",
  });
}