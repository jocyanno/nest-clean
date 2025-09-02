import 'dotenv/config';
import { PrismaClient } from '@prisma/client';
import { execSync } from 'node:child_process';
import { randomUUID } from 'node:crypto';

const prisma = new PrismaClient();

function generateUniqueDatabaseURL(schemaId: string) {
  if (!process.env.DATABASE_URL) {
    throw new Error('DATABASE_URL is not set');
  }

  const url = new URL(process.env.DATABASE_URL);
  url.searchParams.set('schema', schemaId);
  return url.toString();
}

const schemaId = randomUUID();

beforeAll(async () => {
  const databaseURL = generateUniqueDatabaseURL(schemaId);
  process.env.DATABASE_URL = databaseURL;

  console.log('databaseURL', databaseURL);

  // Criar schema explicitamente e aplicar o schema do Prisma de forma idempotente
  execSync(`pnpm prisma db execute --url "${databaseURL}" --stdin`, {
    input: `CREATE SCHEMA IF NOT EXISTS "${schemaId}";`,
  });
  execSync(
    `pnpm prisma db push --force-reset --accept-data-loss --skip-generate`,
  );
});

afterAll(async () => {
  try {
    await prisma.$executeRawUnsafe(
      `DROP SCHEMA IF EXISTS "${schemaId}" CASCADE;`,
    );
  } finally {
    await prisma.$disconnect();
    console.log('afterAll');
  }
});
