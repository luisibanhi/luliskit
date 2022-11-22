import { MigrationInterface, QueryRunner } from "typeorm";

export class ResourceAvailabilityRelationFix1669048773544 implements MigrationInterface {
    name = 'ResourceAvailabilityRelationFix1669048773544'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "resource" ADD "availability_constraint_id" uuid`);
        await queryRunner.query(`ALTER TABLE "resource" ADD CONSTRAINT "UQ_860985691d4cb5d05a3a47d1ed6" UNIQUE ("availability_constraint_id")`);
        await queryRunner.query(`ALTER TABLE "resource" ADD CONSTRAINT "FK_860985691d4cb5d05a3a47d1ed6" FOREIGN KEY ("availability_constraint_id") REFERENCES "availability_constraints"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "resource" DROP CONSTRAINT "FK_860985691d4cb5d05a3a47d1ed6"`);
        await queryRunner.query(`ALTER TABLE "resource" DROP CONSTRAINT "UQ_860985691d4cb5d05a3a47d1ed6"`);
        await queryRunner.query(`ALTER TABLE "resource" DROP COLUMN "availability_constraint_id"`);
    }

}
