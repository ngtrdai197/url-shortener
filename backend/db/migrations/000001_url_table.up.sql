CREATE TABLE
    "urls" (
        "id" bigint PRIMARY KEY,
        "short_url" varchar NOT NULL,
        "long_url" varchar NOT NULL,
        "created_at" timestamptz NOT NULL DEFAULT (now ())
    );