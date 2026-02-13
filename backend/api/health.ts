import type { VercelRequest, VercelResponse } from '@vercel/node';
import { json, options } from '../src/utils/http.js';

export default function handler(_req: VercelRequest, res: VercelResponse) {
  if (_req.method === 'OPTIONS') return options(res, ['GET', 'OPTIONS']);
  return json(res, 200, {
    ok: true,
    service: 'product-analytics-backend',
    now: new Date().toISOString()
  });
}
