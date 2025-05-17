import { MigrationInterface, QueryRunner } from 'typeorm';

export class CreateTransactionsTable1747486059608
  implements MigrationInterface
{
  name = 'CreateTransactionsTable1747486059608';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TYPE "public"."transactions_status_enum" AS ENUM('pending', 'completed')`,
    );
    await queryRunner.query(
      `CREATE TABLE "transactions" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "amount" numeric(10,2) NOT NULL, "date" date NOT NULL, "category" character varying NOT NULL, "status" "public"."transactions_status_enum" NOT NULL, CONSTRAINT "PK_a219afd8dd77ed80f5a862f1db9" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE INDEX "UX_TRANSACTIONS_STATUS" ON "transactions" ("status") `,
    );
    await queryRunner.query(
      `CREATE INDEX "UX_TRANSACTIONS_CATEGORY" ON "transactions" ("category") `,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DROP INDEX "public"."UX_TRANSACTIONS_CATEGORY"`);
    await queryRunner.query(`DROP INDEX "public"."UX_TRANSACTIONS_STATUS"`);
    await queryRunner.query(`DROP TABLE "transactions"`);
    await queryRunner.query(`DROP TYPE "public"."transactions_status_enum"`);
  }
}
