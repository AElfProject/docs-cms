"use server";
import { cache } from "react";
import { getTenantAccessToken } from "@/services/get-tenant-access-token";

export const fetcher = cache(
  async (url: string, next?: NextFetchRequestConfig) => {
    const tenantAccessToken = await getTenantAccessToken();
    const res = await fetch(url, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${tenantAccessToken}`,
      },
      next: next || { revalidate: 6000 },
    });

    return await res.json();
  }
);
