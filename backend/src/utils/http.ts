import type { VercelResponse } from '@vercel/node';

function setCors(res: VercelResponse) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Headers', 'content-type, authorization, x-internal-key');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
}

export function json(res: VercelResponse, status: number, body: unknown) {
  setCors(res);
  res.status(status).setHeader('Content-Type', 'application/json; charset=utf-8');
  res.send(JSON.stringify(body));
}

export function methodNotAllowed(res: VercelResponse, allowed: string[]) {
  setCors(res);
  res.setHeader('Allow', allowed.join(', '));
  return json(res, 405, { error: { code: 'METHOD_NOT_ALLOWED', message: `Allowed: ${allowed.join(', ')}` } });
}

export function unauthorized(res: VercelResponse) {
  return json(res, 401, { error: { code: 'UNAUTHORIZED', message: 'Unauthorized' } });
}

export function options(res: VercelResponse, allowed: string[]) {
  setCors(res);
  res.setHeader('Allow', allowed.join(', '));
  res.status(204).end();
}
