CREATE TABLE
    "sessions" (
        "id" uuid PRIMARY KEY,
        "user_id" bigint NOT NULL,
        "refresh_token" varchar NOT NULL,
        "is_blocked" boolean NOT NULL DEFAULT false,
        "expires_at" timestamptz NOT NULL,
        "created_at" timestamptz NOT NULL DEFAULT (now ())
    );

ALTER TABLE "sessions" ADD FOREIGN KEY ("user_id") REFERENCES "users" ("id");