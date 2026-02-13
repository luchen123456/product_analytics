type EnvOptions = { optional?: boolean };

export function getEnv(name: string, options: EnvOptions = {}): string {
  const value = process.env[name];
  if (value && value.length > 0) return value;
  if (options.optional) return '';
  throw new Error(`Missing required env var: ${name}`);
}

