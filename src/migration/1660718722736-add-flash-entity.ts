import { MigrationInterface, QueryRunner } from 'typeorm'

export class addFlashEntity1660718722736 implements MigrationInterface {
  name = 'addFlashEntity1660718722736'

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TYPE "public"."flash_flashcolor_enum" AS ENUM('#ffffff', '#fff1cc', '#cce5ff', '#dbffcc', '#ffcccc')`
    )
    await queryRunner.query(
      `CREATE TABLE "flash" ("id" SERIAL NOT NULL, "question" character varying(128) NOT NULL, "answer" character varying(256) NOT NULL, "tag" character varying NOT NULL DEFAULT 'default', "flashColor" "public"."flash_flashcolor_enum" NOT NULL DEFAULT '#ffffff', "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "PK_0c01a2c1c5f2266942dd1b3fdbc" PRIMARY KEY ("id"))`
    )
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DROP TABLE "flash"`)
    await queryRunner.query(`DROP TYPE "public"."flash_flashcolor_enum"`)
  }
}
