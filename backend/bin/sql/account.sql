CREATE TABLE account_tbl(
  id             SERIAL PRIMARY KEY,
  "usernameHash" CHARACTER(64),
  "passwordHash" CHARACTER(64),
  "sessionId"    CHARACTER(36)
);