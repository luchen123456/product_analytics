import { getArgvJobId } from './workerArgs.js';

async function main() {
  const jobId = getArgvJobId();
  const backendBaseUrl = process.env.BACKEND_BASE_URL;
  if (!backendBaseUrl) throw new Error('Missing BACKEND_BASE_URL');

  const url = `${backendBaseUrl.replace(/\/$/, '')}/api/internal/crawl/jobs/${jobId}`;
  const res = await fetch(url, {
    method: 'POST',
    headers: {
      'content-type': 'application/json',
      ...(process.env.INTERNAL_API_KEY ? { 'x-internal-key': process.env.INTERNAL_API_KEY } : {})
    },
    body: JSON.stringify({
      status: 'succeeded',
      progress: 1,
      result: { note: 'mock completed', completedAt: new Date().toISOString() }
    })
  });

  if (!res.ok) {
    const text = await res.text();
    throw new Error(`Failed: ${res.status} ${text}`);
  }

  process.stdout.write(`OK jobId=${jobId}\n`);
}

main().catch((e) => {
  process.stderr.write(`${e instanceof Error ? e.message : String(e)}\n`);
  process.exitCode = 1;
});

