import type { VercelRequest, VercelResponse } from '@vercel/node';
import { z } from 'zod';
import { json, methodNotAllowed, options, unauthorized } from '../../../../src/utils/http.js';
import { getEnv } from '../../../../src/config/env.js';
import { updateCrawlJob } from '../../../../src/services/crawl/jobs.js';

const BodySchema = z.object({
  status: z.enum(['queued', 'running', 'succeeded', 'failed']),
  progress: z.number().min(0).max(1).optional(),
  result: z.unknown().optional(),
  error: z.object({ message: z.string() }).optional()
});

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method === 'OPTIONS') return options(res, ['POST', 'OPTIONS']);
  if (req.method !== 'POST') return methodNotAllowed(res, ['POST']);

  const internalKey = getEnv('INTERNAL_API_KEY', { optional: true });
  if (!internalKey && process.env.NODE_ENV === 'production') {
    return json(res, 500, { error: { code: 'SERVER_MISCONFIGURED', message: 'INTERNAL_API_KEY is required' } });
  }
  if (internalKey) {
    const provided = String(req.headers['x-internal-key'] ?? '');
    if (provided !== internalKey) return unauthorized(res);
  }

  const jobId = String(req.query.jobId ?? '').trim();
  if (!jobId) return json(res, 400, { error: { code: 'BAD_REQUEST', message: 'Missing jobId' } });

  const parseResult = BodySchema.safeParse(req.body);
  if (!parseResult.success) {
    return json(res, 400, { error: { code: 'BAD_REQUEST', message: 'Invalid body', details: parseResult.error.flatten() } });
  }

  const job = await updateCrawlJob(jobId, parseResult.data);
  if (!job) return json(res, 404, { error: { code: 'NOT_FOUND', message: 'Job not found' } });

  return json(res, 200, { data: job });
}
