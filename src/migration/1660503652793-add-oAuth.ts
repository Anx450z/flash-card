import { MigrationInterface, QueryRunner } from 'typeorm'

export class addOAuth1660503652793 implements MigrationInterface {
  name = 'addOAuth1660503652793'

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "user" ADD "googleId" character varying`)
    await queryRunner.query(`ALTER TABLE "user" ADD "twitterId" character varying`)
    await queryRunner.query(`ALTER TABLE "user" ADD "githubId" character varying`)
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "user" DROP COLUMN "githubId"`)
    await queryRunner.query(`ALTER TABLE "user" DROP COLUMN "twitterId"`)
    await queryRunner.query(`ALTER TABLE "user" DROP COLUMN "googleId"`)
  }
}
