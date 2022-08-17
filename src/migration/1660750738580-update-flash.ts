import { MigrationInterface, QueryRunner } from "typeorm";

export class updateFlash1660750738580 implements MigrationInterface {
    name = 'updateFlash1660750738580'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "flash" DROP COLUMN "question"`);
        await queryRunner.query(`ALTER TABLE "flash" ADD "question" text NOT NULL`);
        await queryRunner.query(`ALTER TABLE "flash" DROP COLUMN "answer"`);
        await queryRunner.query(`ALTER TABLE "flash" ADD "answer" text NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "flash" DROP COLUMN "answer"`);
        await queryRunner.query(`ALTER TABLE "flash" ADD "answer" character varying(256) NOT NULL`);
        await queryRunner.query(`ALTER TABLE "flash" DROP COLUMN "question"`);
        await queryRunner.query(`ALTER TABLE "flash" ADD "question" character varying(128) NOT NULL`);
    }

}
