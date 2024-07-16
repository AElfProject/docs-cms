"use server";

import { getTenantAccessToken } from "@/services/get-tenant-access-token";

export const fetcher = async <T = any>(
  url: string,
  next?: NextFetchRequestConfig
): Promise<T> => {
  if (process.env.CI) {
    // throttle build in CI to avoid rate-limiting errors
    // await sleep();
  }

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

const sleep = async (delay = 500) =>
  new Promise(resolve => {
    setTimeout(resolve, delay);
  });
