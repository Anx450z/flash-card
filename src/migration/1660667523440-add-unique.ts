import { MigrationInterface, QueryRunner } from "typeorm";

export class addUnique1660667523440 implements MigrationInterface {
    name = 'addUnique1660667523440'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "user" ADD CONSTRAINT "UQ_470355432cc67b2c470c30bef7c" UNIQUE ("googleId")`);
        await queryRunner.query(`ALTER TABLE "user" ADD CONSTRAINT "UQ_fbcf1fac85c4b6bd636a50559c1" UNIQUE ("twitterId")`);
        await queryRunner.query(`ALTER TABLE "user" ADD CONSTRAINT "UQ_0d84cc6a830f0e4ebbfcd6381dd" UNIQUE ("githubId")`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "user" DROP CONSTRAINT "UQ_0d84cc6a830f0e4ebbfcd6381dd"`);
        await queryRunner.query(`ALTER TABLE "user" DROP CONSTRAINT "UQ_fbcf1fac85c4b6bd636a50559c1"`);
        await queryRunner.query(`ALTER TABLE "user" DROP CONSTRAINT "UQ_470355432cc67b2c470c30bef7c"`);
    }

}
