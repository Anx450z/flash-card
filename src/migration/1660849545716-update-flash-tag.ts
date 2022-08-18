import { MigrationInterface, QueryRunner } from 'typeorm'

export class updateFlashTag1660849545716 implements MigrationInterface {
  name = 'updateFlashTag1660849545716'

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "flash" DROP COLUMN "tag"`)
    await queryRunner.query(
      `ALTER TABLE "flash" ADD "tag" character varying(25) NOT NULL DEFAULT 'default'`
    )
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "flash" DROP COLUMN "tag"`)
    await queryRunner.query(
      `ALTER TABLE "flash" ADD "tag" character varying NOT NULL DEFAULT 'default'`
    )
  }
}
