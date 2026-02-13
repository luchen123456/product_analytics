import type { VercelRequest, VercelResponse } from '@vercel/node';
import { json, methodNotAllowed, options } from '../../src/utils/http.js';
import { getMockProducts } from '../../src/services/products/mock.js';

export default function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method === 'OPTIONS') return options(res, ['GET', 'OPTIONS']);
  if (req.method !== 'GET') return methodNotAllowed(res, ['GET']);

  const productId = String(req.query.productId ?? '').trim();
  if (!productId) return json(res, 400, { error: { code: 'BAD_REQUEST', message: 'Missing productId' } });

  const product = getMockProducts().find((p) => p.id === productId);
  if (!product) return json(res, 404, { error: { code: 'NOT_FOUND', message: 'Product not found' } });

  return json(res, 200, { data: product });
}
