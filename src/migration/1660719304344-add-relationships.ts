import { MigrationInterface, QueryRunner } from 'typeorm'

export class addRelationships1660719304344 implements MigrationInterface {
  name = 'addRelationships1660719304344'

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "flash" ADD "user_id" integer`)
    await queryRunner.query(
      `ALTER TABLE "flash" ADD CONSTRAINT "FK_6a3eebcbd6c5c8976b222f17708" FOREIGN KEY ("user_id") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`
    )
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "flash" DROP CONSTRAINT "FK_6a3eebcbd6c5c8976b222f17708"`)
    await queryRunner.query(`ALTER TABLE "flash" DROP COLUMN "user_id"`)
  }
}
