import { execSync } from 'node:child_process';
import { assertTestDatabase, TEST_DATABASE_URL } from './e2e-env.js';

/** Runs once before all e2e files: bring the test database schema up to date. */
export default function setup() {
  assertTestDatabase(TEST_DATABASE_URL);
  execSync('npx prisma migrate deploy', {
    stdio: 'inherit',
    env: { ...process.env, DATABASE_URL: TEST_DATABASE_URL },
  });
}
