import { MigrationInterface, QueryRunner } from "typeorm";

export class AddMinSlotDaysToProject1669047687740 implements MigrationInterface {
    name = 'AddMinSlotDaysToProject1669047687740'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "project_resources_resource" DROP CONSTRAINT "FK_311054569848024e7a68d91a1c5"`);
        await queryRunner.query(`ALTER TABLE "project" ADD "minSlotDays" integer NOT NULL DEFAULT '60'`);
        await queryRunner.query(`ALTER TABLE "project_resources_resource" ADD CONSTRAINT "FK_311054569848024e7a68d91a1c5" FOREIGN KEY ("resourceId") REFERENCES "resource"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "project_resources_resource" DROP CONSTRAINT "FK_311054569848024e7a68d91a1c5"`);
        await queryRunner.query(`ALTER TABLE "project" DROP COLUMN "minSlotDays"`);
        await queryRunner.query(`ALTER TABLE "project_resources_resource" ADD CONSTRAINT "FK_311054569848024e7a68d91a1c5" FOREIGN KEY ("resourceId") REFERENCES "resource"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
    }

}
