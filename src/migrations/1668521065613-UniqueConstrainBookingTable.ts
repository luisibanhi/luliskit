import { MigrationInterface, QueryRunner } from "typeorm";

export class UniqueConstrainBookingTable1668521065613 implements MigrationInterface {
    name = 'UniqueConstrainBookingTable1668521065613'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE UNIQUE INDEX "IDX_32a845374dfc71d6e060d7dfe5" ON "booking" ("start", "resource_id") `);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP INDEX "public"."IDX_32a845374dfc71d6e060d7dfe5"`);
    }

}
