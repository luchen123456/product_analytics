import type { VercelRequest, VercelResponse } from '@vercel/node';
import { json, methodNotAllowed, options } from '../../../src/utils/http.js';
import { getCrawlJob } from '../../../src/services/crawl/jobs.js';

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method === 'OPTIONS') return options(res, ['GET', 'OPTIONS']);
  if (req.method !== 'GET') return methodNotAllowed(res, ['GET']);

  const jobId = String(req.query.jobId ?? '').trim();
  if (!jobId) return json(res, 400, { error: { code: 'BAD_REQUEST', message: 'Missing jobId' } });

  const job = await getCrawlJob(jobId);
  if (!job) return json(res, 404, { error: { code: 'NOT_FOUND', message: 'Job not found' } });

  return json(res, 200, { data: job });
}
