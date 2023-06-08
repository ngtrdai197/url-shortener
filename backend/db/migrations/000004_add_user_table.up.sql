CREATE TABLE
    "users" (
        "id" bigserial PRIMARY KEY,
        "username" varchar UNIQUE NOT NULL,
        "hashed_password" varchar NOT NULL,
        "full_name" varchar NOT NULL,
        "created_at" timestamptz NOT NULL DEFAULT (now ())
    );

ALTER TABLE "urls"
ADD COLUMN "user_id" bigint NOT NULL CONSTRAINT URL_USER_FK REFERENCES "users" ("id");