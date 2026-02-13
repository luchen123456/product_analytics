import type { VercelRequest, VercelResponse } from '@vercel/node';
import { z } from 'zod';
import { json, methodNotAllowed, options } from '../../src/utils/http.js';
import { getMockProducts } from '../../src/services/products/mock.js';

const QuerySchema = z.object({
  keyword: z.string().trim().optional(),
  page: z.coerce.number().int().min(1).optional().default(1),
  pageSize: z.coerce.number().int().min(1).max(200).optional().default(50)
});

export default function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method === 'OPTIONS') return options(res, ['GET', 'OPTIONS']);
  if (req.method !== 'GET') return methodNotAllowed(res, ['GET']);

  const parseResult = QuerySchema.safeParse(req.query);
  if (!parseResult.success) {
    return json(res, 400, { error: { code: 'BAD_REQUEST', message: 'Invalid query', details: parseResult.error.flatten() } });
  }

  const { keyword, page, pageSize } = parseResult.data;
  const all = getMockProducts();
  const filtered = keyword
    ? all.filter((p) => p.name.toLowerCase().includes(keyword.toLowerCase()))
    : all;

  const start = (page - 1) * pageSize;
  const items = filtered.slice(start, start + pageSize);

  return json(res, 200, {
    data: {
      items,
      page,
      pageSize,
      total: filtered.length
    }
  });
}
