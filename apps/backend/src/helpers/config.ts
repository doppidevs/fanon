
const { env } = Bun;

const getEnv = (key: string) => {
  const value = env[key];
  if (!value) throw new Error(`Environment variable ${key} is not set`);
  return value;
}

export const config = {
  PORT: getEnv('PORT'),
  DATABASE_URL: getEnv('DATABASE_URL'),
}

