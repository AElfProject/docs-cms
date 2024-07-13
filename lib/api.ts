"use server";

import { getTenantAccessToken } from "@/services/get-tenant-access-token";

export const fetcher = async (url: string) => {
  const tenantAccessToken = await getTenantAccessToken();
  const res = await fetch(url, {
    method: "GET",
    headers: {
      Authorization: `Bearer ${tenantAccessToken}`,
    },
    next: { revalidate: 60 },
  });
  return res.json();
};
