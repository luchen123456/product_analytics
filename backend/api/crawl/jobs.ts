import type { VercelRequest, VercelResponse } from '@vercel/node';
import { json, methodNotAllowed, options } from '../../src/utils/http.js';
import { CreateCrawlJobBodySchema } from '../../src/api-contract/schemas.js';
import { createCrawlJob } from '../../src/services/crawl/jobs.js';

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method === 'OPTIONS') return options(res, ['POST', 'OPTIONS']);
  if (req.method !== 'POST') return methodNotAllowed(res, ['POST']);

  const parseResult = CreateCrawlJobBodySchema.safeParse(req.body);
  if (!parseResult.success) {
    return json(res, 400, { error: { code: 'BAD_REQUEST', message: 'Invalid body', details: parseResult.error.flatten() } });
  }

  const job = await createCrawlJob(parseResult.data);
  return json(res, 201, { data: { jobId: job.id, enqueued: true } });
}
