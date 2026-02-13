import { nanoid } from 'nanoid';
import type { CrawlJob } from '../../domain/models.js';
import type { CreateCrawlJobBody } from '../../api-contract/schemas.js';
import { getKv } from '../../adapters/storage/kv.js';
import { getCrawlQueue } from '../../adapters/storage/queue.js';

const JOB_PREFIX = 'jobs:crawl:';

function nowIso() {
  return new Date().toISOString();
}

function keyFor(jobId: string) {
  return `${JOB_PREFIX}${jobId}`;
}

export async function createCrawlJob(input: CreateCrawlJobBody): Promise<CrawlJob> {
  const kv = getKv();
  const queue = getCrawlQueue();
  const id = nanoid();
  const timestamp = nowIso();

  const job: CrawlJob = {
    id,
    type: 'crawl',
    createdAt: timestamp,
    updatedAt: timestamp,
    status: 'queued',
    progress: 0,
    input: {
      keyword: input.keyword,
      productUrl: input.productUrl,
      shopId: input.shopId,
      pages: input.pages ?? 5
    }
  };

  await kv.setJson(keyFor(id), job, { exSeconds: 60 * 60 });
  await queue.enqueue({ kind: 'crawl', jobId: id });
  return job;
}

export async function getCrawlJob(jobId: string): Promise<CrawlJob | null> {
  const kv = getKv();
  return kv.getJson<CrawlJob>(keyFor(jobId));
}

export async function updateCrawlJob(
  jobId: string,
  patch: Partial<Pick<CrawlJob, 'status' | 'progress' | 'result' | 'error'>>
): Promise<CrawlJob | null> {
  const kv = getKv();
  const existing = await kv.getJson<CrawlJob>(keyFor(jobId));
  if (!existing) return null;

  const updated: CrawlJob = {
    ...existing,
    ...patch,
    progress: typeof patch.progress === 'number' ? patch.progress : existing.progress,
    updatedAt: nowIso()
  };

  await kv.setJson(keyFor(jobId), updated, { exSeconds: 60 * 60 });
  return updated;
}
