import { getTenantAccessToken } from "@/services/get-tenant-access-token";
import { backOff } from "exponential-backoff";

export const fetcher = async <T = any>(
  url: string,
  next?: NextFetchRequestConfig
): Promise<T> => {
  const startTime = new Date().getTime();
  const tenantAccessToken = await getTenantAccessToken();
  const res = await backOff(() =>
    fetch(url, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${tenantAccessToken}`,
      },
      next: { revalidate: 6000, ...next },
    })
  );
  const endTime = new Date().getTime();
  if (process.env.NODE_ENV === "development") {
    // console.log(endTime - startTime, "===TIME===");
  }

  return await res.json();
};
