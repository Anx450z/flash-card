import { MigrationInterface, QueryRunner } from "typeorm";

export class firstMigration1662052526430 implements MigrationInterface {
    name = 'firstMigration1662052526430'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "flash" ("id" SERIAL NOT NULL, "question" text NOT NULL, "answer" text NOT NULL, "tag" character varying(25) NOT NULL DEFAULT 'default', "favorite" boolean NOT NULL DEFAULT false, "flashColor" "public"."flash_flashcolor_enum" NOT NULL DEFAULT '#ffffff', "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "user_id" integer, CONSTRAINT "PK_0c01a2c1c5f2266942dd1b3fdbc" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "user" ("id" SERIAL NOT NULL, "userName" character varying, "firstName" character varying NOT NULL, "lastName" character varying NOT NULL, "email" character varying NOT NULL, "createdOn" TIMESTAMP NOT NULL DEFAULT now(), "updatedOn" TIMESTAMP NOT NULL DEFAULT now(), "isAdmin" boolean NOT NULL DEFAULT false, "photo" character varying, "googleId" character varying, "twitterId" character varying, "githubId" character varying, CONSTRAINT "UQ_e12875dfb3b1d92d7d7c5377e22" UNIQUE ("email"), CONSTRAINT "UQ_470355432cc67b2c470c30bef7c" UNIQUE ("googleId"), CONSTRAINT "UQ_fbcf1fac85c4b6bd636a50559c1" UNIQUE ("twitterId"), CONSTRAINT "UQ_0d84cc6a830f0e4ebbfcd6381dd" UNIQUE ("githubId"), CONSTRAINT "PK_cace4a159ff9f2512dd42373760" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE INDEX "IDX_e12875dfb3b1d92d7d7c5377e2" ON "user" ("email") `);
        await queryRunner.query(`ALTER TABLE "flash" ADD CONSTRAINT "FK_6a3eebcbd6c5c8976b222f17708" FOREIGN KEY ("user_id") REFERENCES "user"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "flash" DROP CONSTRAINT "FK_6a3eebcbd6c5c8976b222f17708"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_e12875dfb3b1d92d7d7c5377e2"`);
        await queryRunner.query(`DROP TABLE "user"`);
        await queryRunner.query(`DROP TABLE "flash"`);
    }

}
