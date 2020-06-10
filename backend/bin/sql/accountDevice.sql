CREATE TABLE accountDevice_tbl(
  "accountId" INTEGER REFERENCES account_tbl(id),
  "deviceId"  INTEGER REFERENCES device_tbl(id) ON DELETE CASCADE,
  PRIMARY KEY ("accountId", "deviceId")
);