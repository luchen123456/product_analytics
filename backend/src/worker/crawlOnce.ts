import { crawlPage } from './crawlPage.js';

type Args = {
  url: string;
  jobId?: string;
  backendBaseUrl?: string;
  internalKey?: string;
};

function getArg(name: string): string | undefined {
  const idx = process.argv.indexOf(`--${name}`);
  if (idx === -1) return undefined;
  return process.argv[idx + 1];
}

function parseArgs(): Args {
  const url = getArg('url');
  if (!url) throw new Error('Missing --url');
  return {
    url,
    jobId: getArg('jobId'),
    backendBaseUrl: getArg('backendBaseUrl') ?? process.env.BACKEND_BASE_URL,
    internalKey: getArg('internalKey') ?? process.env.INTERNAL_API_KEY
  };
}

async function maybeUpdateJob(args: Args, payload: unknown) {
  if (!args.jobId || !args.backendBaseUrl) return;

  const target = `${args.backendBaseUrl.replace(/\/$/, '')}/api/internal/crawl/jobs/${args.jobId}`;
  const res = await fetch(target, {
    method: 'POST',
    headers: {
      'content-type': 'application/json',
      ...(args.internalKey ? { 'x-internal-key': args.internalKey } : {})
    },
    body: JSON.stringify(payload)
  });

  if (!res.ok) {
    const text = await res.text();
    throw new Error(`Failed to update job: ${res.status} ${text}`);
  }
}

async function main() {
  const args = parseArgs();

  await maybeUpdateJob(args, { status: 'running', progress: 0.05 });

  try {
    const result = await crawlPage(args.url);

    await maybeUpdateJob(args, { status: 'succeeded', progress: 1, result });
    process.stdout.write(`${JSON.stringify({ ok: true, result }, null, 2)}\n`);
  } catch (err) {
    const message = err instanceof Error ? err.message : String(err);
    await maybeUpdateJob(args, { status: 'failed', progress: 1, error: { message } }).catch(() => {});
    process.stderr.write(`${JSON.stringify({ ok: false, error: { message } }, null, 2)}\n`);
    process.exitCode = 1;
  } finally {
  }
}

main().catch((err) => {
  process.stderr.write(`${String(err)}\n`);
  process.exitCode = 1;
});
