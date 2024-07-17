"use server";
import { getTenantAccessToken } from "@/services/get-tenant-access-token";
import { backOff } from "exponential-backoff";
import { createRedisInstance } from "./redis";
// get redis instance
const redis = createRedisInstance();
export const fetcher = async <T = any>(
  url: string,
  next?: NextFetchRequestConfig
): Promise<T> => {
  const startTime = new Date();
  let elapsedTime;
  // try fetch cached data
  const cached = await redis.get(url);
  if (cached) {
    elapsedTime = new Date().getTime() - startTime.getTime();
    console.log(url, "=======yyyyyyyyyy=====", elapsedTime);
    return JSON.parse(cached) as any;
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
  elapsedTime = new Date().getTime() - startTime.getTime();
  console.log(url, "=======xxxxxxxxxx=====", elapsedTime);
  const result = await res.json();
  // cache data setting an expiry of 1 hour
  // this means that the cached data will remain alive for 60 minutes
  // after that, we'll get fresh data from the DB
  const MAX_AGE = 60_000 * 60; // 1 hour
  const EXPIRY_MS = `PX`; // milliseconds
  // cache data
  await redis.set(url, JSON.stringify(result), EXPIRY_MS, MAX_AGE);
  return result;
};
