import { Redis } from '@upstash/redis';

type Json = unknown;
type SetOptions = { exSeconds?: number };

export interface KV {
  getJson<T = Json>(key: string): Promise<T | null>;
  setJson(key: string, value: Json, options?: SetOptions): Promise<void>;
}

class MemoryKV implements KV {
  private store = new Map<string, string>();
  async getJson<T>(key: string): Promise<T | null> {
    const value = this.store.get(key);
    if (!value) return null;
    return JSON.parse(value) as T;
  }
  async setJson(key: string, value: Json): Promise<void> {
    this.store.set(key, JSON.stringify(value));
  }
}

class UpstashKV implements KV {
  constructor(private redis: Redis) {}
  async getJson<T>(key: string): Promise<T | null> {
    const value = await this.redis.get<T>(key);
    return value ?? null;
  }
  async setJson(key: string, value: Json, options?: SetOptions): Promise<void> {
    if (options?.exSeconds) {
      await this.redis.set(key, value, { ex: options.exSeconds });
      return;
    }
    await this.redis.set(key, value);
  }
}

let singleton: KV | null = null;

export function getKv(): KV {
  if (singleton) return singleton;

  const url = process.env.UPSTASH_REDIS_REST_URL;
  const token = process.env.UPSTASH_REDIS_REST_TOKEN;
  if (url && token) {
    singleton = new UpstashKV(new Redis({ url, token }));
    return singleton;
  }

  singleton = new MemoryKV();
  return singleton;
}

