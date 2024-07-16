"use server";

import { getTenantAccessToken } from "@/services/get-tenant-access-token";

export const fetcher = async <T>(
  url: string,
  next?: NextFetchRequestConfig
): Promise<T> => {
  const tenantAccessToken = await getTenantAccessToken();
  const res = await fetch(url, {
    method: "GET",
    headers: {
      Authorization: `Bearer ${tenantAccessToken}`,
    },
    next: next || { revalidate: 6000 },
  });

  return await res.json();
};
