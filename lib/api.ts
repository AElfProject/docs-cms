import { getTenantAccessToken } from "@/services/get-tenant-access-token";
import { backOff } from "exponential-backoff";

export const fetcher = async <T = any>(
  url: string,
  next?: NextFetchRequestConfig
): Promise<T> => {
  const tenantAccessToken = await getTenantAccessToken();
  const res = await backOff(() =>
    fetch(url, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${tenantAccessToken}`,
      },
      next: next || { revalidate: 6000 },
    })
  );

  return await res.json();
};
