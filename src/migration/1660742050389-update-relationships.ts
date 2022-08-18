import { MigrationInterface, QueryRunner } from 'typeorm'

export class updateRelationships1660742050389 implements MigrationInterface {
  name = 'updateRelationships1660742050389'

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "flash" DROP CONSTRAINT "FK_6a3eebcbd6c5c8976b222f17708"`)
    await queryRunner.query(
      `ALTER TABLE "flash" ADD CONSTRAINT "FK_6a3eebcbd6c5c8976b222f17708" FOREIGN KEY ("user_id") REFERENCES "user"("id") ON DELETE CASCADE ON UPDATE NO ACTION`
    )
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "flash" DROP CONSTRAINT "FK_6a3eebcbd6c5c8976b222f17708"`)
    await queryRunner.query(
      `ALTER TABLE "flash" ADD CONSTRAINT "FK_6a3eebcbd6c5c8976b222f17708" FOREIGN KEY ("user_id") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`
    )
  }
}
