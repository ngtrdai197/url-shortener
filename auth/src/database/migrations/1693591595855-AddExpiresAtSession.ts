import { MigrationInterface, QueryRunner } from "typeorm";

export class AddExpiresAtSession1693591595855 implements MigrationInterface {
    name = 'AddExpiresAtSession1693591595855'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "session" ADD "expires_at" TIMESTAMP NOT NULL DEFAULT '"2023-09-01T18:06:57.838Z"'`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "session" DROP COLUMN "expires_at"`);
    }

}
