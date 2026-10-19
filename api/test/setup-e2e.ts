import { assertTestDatabase, TEST_DATABASE_URL } from './e2e-env.js';

// Runs in each e2e worker before the app is imported. ConfigModule (dotenv)
// never overrides an existing variable, so this wins over api/.env.
process.env.DATABASE_URL = TEST_DATABASE_URL;
assertTestDatabase(process.env.DATABASE_URL);
