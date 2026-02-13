import { getCrawlQueue } from '../adapters/storage/queue.js';
import { getCrawlJob, updateCrawlJob } from '../services/crawl/jobs.js';
import { crawlPage } from './crawlPage.js';

function sleep(ms: number) {
  return new Promise((r) => setTimeout(r, ms));
}

async function processJob(jobId: string) {
  const job = await getCrawlJob(jobId);
  if (!job) return;

  await updateCrawlJob(jobId, { status: 'running', progress: 0.05 });

  const base = (process.env.SHOPEE_BASE_URL ?? 'https://shopee.sg').replace(/\/$/, '');
  const url =
    job.input.productUrl ??
    (job.input.keyword ? `${base}/search?keyword=${encodeURIComponent(job.input.keyword)}` : undefined) ??
    (job.input.shopId ? `${base}/shop/${encodeURIComponent(job.input.shopId)}` : undefined);

  if (!url) {
    await updateCrawlJob(jobId, { status: 'failed', progress: 1, error: { message: 'No crawl target provided.' } });
    return;
  }

  try {
    const result = await crawlPage(url);
    await updateCrawlJob(jobId, { status: 'succeeded', progress: 1, result });
  } catch (err) {
    const message = err instanceof Error ? err.message : String(err);
    await updateCrawlJob(jobId, { status: 'failed', progress: 1, error: { message } });
  }
}

async function main() {
  const queue = getCrawlQueue();
  const pollMs = Number(process.env.WORKER_POLL_MS ?? '1500');

  while (true) {
    const msg = await queue.dequeue();
    if (!msg) {
      await sleep(pollMs);
      continue;
    }
    await processJob(msg.jobId);
  }
}

main().catch((err) => {
  process.stderr.write(`${err instanceof Error ? err.message : String(err)}\n`);
  process.exitCode = 1;
});
