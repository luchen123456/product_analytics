export function getArg(name: string): string | undefined {
  const idx = process.argv.indexOf(`--${name}`);
  if (idx === -1) return undefined;
  return process.argv[idx + 1];
}

export function getArgvJobId(): string {
  const jobId = getArg('jobId');
  if (!jobId) throw new Error('Missing --jobId');
  return jobId;
}

