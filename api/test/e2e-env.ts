/**
 * The e2e tests always run against the separate test database, never library_dev.
 * Override with TEST_DATABASE_URL (e.g. in CI).
 */
export const TEST_DATABASE_URL =
  process.env.TEST_DATABASE_URL ??
  'postgresql://library:library@localhost:5432/library_test';

/** Safety net: the tests wipe tables, so refuse anything not named *_test. */
export function assertTestDatabase(url: string | undefined) {
  const dbName = url ? new URL(url).pathname.slice(1) : '';
  if (!dbName.endsWith('_test')) {
    throw new Error(
      `Refusing to run e2e tests: DATABASE_URL must point to a *_test database (got "${dbName}").`,
    );
  }
}
