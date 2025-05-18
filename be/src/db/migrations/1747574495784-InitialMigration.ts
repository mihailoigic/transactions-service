import { MigrationInterface, QueryRunner } from 'typeorm';

export class InitialMigration1747574552726 implements MigrationInterface {
  name = 'InitialMigration1747574552726';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "categories" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "name" character varying NOT NULL, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "PK_24dbc6126a28ff948da33e97d3b" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TYPE "public"."transactions_status_enum" AS ENUM('pending', 'completed')`,
    );
    await queryRunner.query(
      `CREATE TABLE "transactions" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "amount" numeric(10,2) NOT NULL, "date" date NOT NULL, "status" "public"."transactions_status_enum" NOT NULL, "categoryId" uuid NOT NULL, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "PK_a219afd8dd77ed80f5a862f1db9" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE INDEX "UX_TRANSACTIONS_STATUS" ON "transactions" ("status") `,
    );
    await queryRunner.query(
      `CREATE INDEX "UX_TRANSACTIONS_CATEGORY" ON "transactions" ("categoryId") `,
    );
    await queryRunner.query(
      `ALTER TABLE "transactions" ADD CONSTRAINT "FK_86e965e74f9cc66149cf6c90f64" FOREIGN KEY ("categoryId") REFERENCES "categories"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "transactions" DROP CONSTRAINT "FK_86e965e74f9cc66149cf6c90f64"`,
    );
    await queryRunner.query(`DROP INDEX "public"."UX_TRANSACTIONS_CATEGORY"`);
    await queryRunner.query(`DROP INDEX "public"."UX_TRANSACTIONS_STATUS"`);
    await queryRunner.query(`DROP TABLE "transactions"`);
    await queryRunner.query(`DROP TYPE "public"."transactions_status_enum"`);
    await queryRunner.query(`DROP TABLE "categories"`);
  }
}
