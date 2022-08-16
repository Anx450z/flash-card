import { MigrationInterface, QueryRunner } from 'typeorm'

export class updateUsername1660665576505 implements MigrationInterface {
  name = 'updateUsername1660665576505'

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "user" ALTER COLUMN "userName" DROP NOT NULL`)
    await queryRunner.query(`ALTER TABLE "user" DROP CONSTRAINT "UQ_da5934070b5f2726ebfd3122c80"`)
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "user" ADD CONSTRAINT "UQ_da5934070b5f2726ebfd3122c80" UNIQUE ("userName")`
    )
    await queryRunner.query(`ALTER TABLE "user" ALTER COLUMN "userName" SET NOT NULL`)
  }
}
