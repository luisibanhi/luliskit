import { MigrationInterface, QueryRunner } from "typeorm";

export class RemoveAvailabilityConstrainsRelationAndAddColumntoResource1669070686918 implements MigrationInterface {
    name = 'RemoveAvailabilityConstrainsRelationAndAddColumntoResource1669070686918'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "resource" DROP CONSTRAINT "FK_860985691d4cb5d05a3a47d1ed6"`);
        await queryRunner.query(`ALTER TABLE "resource" RENAME COLUMN "availability_constraint_id" TO "availability_constraints"`);
        await queryRunner.query(`ALTER TABLE "resource" RENAME CONSTRAINT "UQ_860985691d4cb5d05a3a47d1ed6" TO "UQ_7f0ab9039b01e455d4bbfaf99fe"`);
        await queryRunner.query(`ALTER TABLE "resource" DROP CONSTRAINT "UQ_7f0ab9039b01e455d4bbfaf99fe"`);
        await queryRunner.query(`ALTER TABLE "resource" DROP COLUMN "availability_constraints"`);
        await queryRunner.query(`ALTER TABLE "resource" ADD "availability_constraints" json`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "resource" DROP COLUMN "availability_constraints"`);
        await queryRunner.query(`ALTER TABLE "resource" ADD "availability_constraints" uuid`);
        await queryRunner.query(`ALTER TABLE "resource" ADD CONSTRAINT "UQ_7f0ab9039b01e455d4bbfaf99fe" UNIQUE ("availability_constraints")`);
        await queryRunner.query(`ALTER TABLE "resource" RENAME CONSTRAINT "UQ_7f0ab9039b01e455d4bbfaf99fe" TO "UQ_860985691d4cb5d05a3a47d1ed6"`);
        await queryRunner.query(`ALTER TABLE "resource" RENAME COLUMN "availability_constraints" TO "availability_constraint_id"`);
        await queryRunner.query(`ALTER TABLE "resource" ADD CONSTRAINT "FK_860985691d4cb5d05a3a47d1ed6" FOREIGN KEY ("availability_constraint_id") REFERENCES "availability_constraints"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

}
