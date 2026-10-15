-- Runs once, on the first start with an empty data volume.
-- library_dev is created by POSTGRES_DB; this adds a separate database for e2e tests.
CREATE DATABASE library_test;
