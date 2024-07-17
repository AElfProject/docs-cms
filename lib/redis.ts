"use server";
import Redis, { RedisOptions } from "ioredis";
import configuration from "../configuration";

function getRedisConfiguration(): {
  port: string;
  host: string;
  password: string;
} {
  return configuration.redis;
}

function createRedisInstance(config = getRedisConfiguration()) {
  try {
    const options: RedisOptions = {
      host: config.host,
      lazyConnect: true,
      showFriendlyErrorStack: true,
      enableAutoPipelining: true,
      maxRetriesPerRequest: 0,
      retryStrategy: (times: number) => {
        if (times > 3) {
          throw new Error(`[Redis] Could not connect after ${times} attempts`);
        }

        return Math.min(times * 200, 1000);
      },
    };

    if (config.port) {
      options.port = +config.port;
    }

    if (config.password) {
      options.password = config.password;
    }

    const redis = new Redis(options);

    redis.on("error", (error: unknown) => {
      console.warn("[Redis] Error connecting", error);
    });

    return redis;
  } catch (e) {
    throw new Error(`[Redis] Could not create a Redis instance`);
  }
}
const redis: Redis = createRedisInstance();
export const getRedisData = async (key: string) => {
  const cached = await redis.get(key);
  if (cached) {
    return JSON.parse(cached) as any;
  }
};

export const setRedisData = async (key: string, data: any) => {
  const MAX_AGE = 60_000 * 60; // 1 hour
  const EXPIRY_MS = `PX`; // milliseconds
  // cache data
  await redis.set(key, JSON.stringify(data), EXPIRY_MS, MAX_AGE);
};
