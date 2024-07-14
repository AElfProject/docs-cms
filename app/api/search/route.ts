import { getSearchConfig } from "@/services/get-search-config";
import { NextRequest } from "next/server";

export async function GET(request: NextRequest) {
  const config = await getSearchConfig();

  return Response.json(config);
}
