import { MigrationInterface, QueryRunner } from "typeorm";

export class UpdateCraetedAtSession1693597828166 implements MigrationInterface {
    name = 'UpdateCraetedAtSession1693597828166'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "session" ALTER COLUMN "expires_at" SET DEFAULT '"2023-09-01T19:50:44.240Z"'`);
        await queryRunner.query(`ALTER TABLE "session" ALTER COLUMN "created_at" SET DEFAULT now()`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "session" ALTER COLUMN "created_at" DROP DEFAULT`);
        await queryRunner.query(`ALTER TABLE "session" ALTER COLUMN "expires_at" SET DEFAULT '2023-09-01 18:06:57.838'`);
    }
}
