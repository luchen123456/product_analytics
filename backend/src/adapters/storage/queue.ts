import { Redis } from '@upstash/redis';

export type CrawlQueueMessage = {
  kind: 'crawl';
  jobId: string;
};

export interface CrawlQueue {
  enqueue(message: CrawlQueueMessage): Promise<void>;
  dequeue(): Promise<CrawlQueueMessage | null>;
}

const QUEUE_KEY = 'queue:crawl';

class MemoryCrawlQueue implements CrawlQueue {
  private items: CrawlQueueMessage[] = [];
  async enqueue(message: CrawlQueueMessage): Promise<void> {
    this.items.unshift(message);
  }
  async dequeue(): Promise<CrawlQueueMessage | null> {
    return this.items.pop() ?? null;
  }
}

class UpstashCrawlQueue implements CrawlQueue {
  constructor(private redis: Redis) {}

  async enqueue(message: CrawlQueueMessage): Promise<void> {
    await this.redis.lpush(QUEUE_KEY, JSON.stringify(message));
  }

  async dequeue(): Promise<CrawlQueueMessage | null> {
    const raw = await this.redis.rpop<string>(QUEUE_KEY);
    if (!raw) return null;
    const parsed = JSON.parse(raw) as CrawlQueueMessage;
    if (!parsed || parsed.kind !== 'crawl' || typeof parsed.jobId !== 'string') return null;
    return parsed;
  }
}

let singleton: CrawlQueue | null = null;

export function getCrawlQueue(): CrawlQueue {
  if (singleton) return singleton;

  const url = process.env.UPSTASH_REDIS_REST_URL;
  const token = process.env.UPSTASH_REDIS_REST_TOKEN;
  if (url && token) {
    singleton = new UpstashCrawlQueue(new Redis({ url, token }));
    return singleton;
  }

  singleton = new MemoryCrawlQueue();
  return singleton;
}

