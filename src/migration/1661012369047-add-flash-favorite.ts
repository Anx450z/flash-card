import { MigrationInterface, QueryRunner } from "typeorm";

export class addFlashFavorite1661012369047 implements MigrationInterface {
    name = 'addFlashFavorite1661012369047'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "flash" ADD "favorite" boolean NOT NULL DEFAULT false`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "flash" DROP COLUMN "favorite"`);
    }

}
