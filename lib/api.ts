import { getTenantAccessToken } from "@/services/get-tenant-access-token";
import { backOff } from "exponential-backoff";
import { getRedisData, setRedisData } from "./redis";

export const fetcher = async <T = any>(
  url: string,
  next?: NextFetchRequestConfig
): Promise<T> => {
  const startTime = new Date();
  let elapsedTime;
  if (process.env.NODE_ENV === "development") {
    const result = await getRedisData(url);
    if (result) {
      elapsedTime = new Date().getTime() - startTime.getTime();
      console.log(url, "=======yyyyyyyyyy=====", elapsedTime);
      return result;
    }
  }
  // fetch fresh data
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
  const result = await res.json();
  if (process.env.NODE_ENV === "development") {
    elapsedTime = new Date().getTime() - startTime.getTime();
    console.log(url, "=======xxxxxxxxxx=====", elapsedTime);
    await setRedisData(url, result);
  }
  return result;
};
