CREATE TABLE
    "urls" (
        "id" bigint PRIMARY KEY,
        "short_url" varchar NOT NULL,
        "long_url" varchar NOT NULL,
        "created_at" timestamptz NOT NULL DEFAULT (now ()),
        "user_id" bigint NOT NULL,
        CONSTRAINT UNIQ_LONG_URL UNIQUE (long_url)
    );