CREATE TABLE device_tbl(
    id           SERIAL PRIMARY KEY,
    "macAddress" CHAR(12) NOT NULL,
    nickname     VARCHAR(64),
    status       INTEGER
);