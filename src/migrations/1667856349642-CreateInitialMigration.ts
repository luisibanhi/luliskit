import { MigrationInterface, QueryRunner } from "typeorm";

export class CreateInitialMigration1667856349642 implements MigrationInterface {
    name = 'CreateInitialMigration1667856349642'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "availability_constraints" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "isActive" boolean NOT NULL DEFAULT true, "isArchived" boolean NOT NULL DEFAULT false, "created_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "updated_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "createdBy" character varying(300) NOT NULL, "data" json NOT NULL, CONSTRAINT "PK_e6f573e694b2b72f12d02516dd5" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "resource" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "isActive" boolean NOT NULL DEFAULT true, "isArchived" boolean NOT NULL DEFAULT false, "created_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "updated_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "createdBy" character varying(300) NOT NULL, "email" character varying(300) NOT NULL, "first_name" character varying(300) NOT NULL, "last_name" character varying(300) NOT NULL, "name" character varying(300) NOT NULL, "timezone" character varying(300) NOT NULL, CONSTRAINT "UQ_01a7598d5960d3b6d35ad17900e" UNIQUE ("email"), CONSTRAINT "PK_e2894a5867e06ae2e8889f1173f" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "project" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "isActive" boolean NOT NULL DEFAULT true, "isArchived" boolean NOT NULL DEFAULT false, "created_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "updated_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "createdBy" character varying(300) NOT NULL, "name" character varying(300) NOT NULL, "workdays_default" json NOT NULL DEFAULT '[{"day":"Monday","from":"12:00","to":"20:00"},{"day":"Tuesday","from":"12:00","to":"20:00"},{"day":"Wednesday","from":"12:00","to":"20:00"},{"day":"Thursday","from":"12:00","to":"20:00"},{"day":"Friday","from":"12:00","to":"20:00"}]', "duration" integer NOT NULL DEFAULT '60', CONSTRAINT "PK_4d68b1358bb5b766d3e78f32f57" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "project_resources_resource" ("projectId" uuid NOT NULL, "resourceId" uuid NOT NULL, CONSTRAINT "PK_b4370835940a06a474e5553c132" PRIMARY KEY ("projectId", "resourceId"))`);
        await queryRunner.query(`CREATE INDEX "IDX_d620b3a6349ea949a20392ffe5" ON "project_resources_resource" ("projectId") `);
        await queryRunner.query(`CREATE INDEX "IDX_311054569848024e7a68d91a1c" ON "project_resources_resource" ("resourceId") `);
        await queryRunner.query(`ALTER TABLE "project_resources_resource" ADD CONSTRAINT "FK_d620b3a6349ea949a20392ffe5c" FOREIGN KEY ("projectId") REFERENCES "project"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE "project_resources_resource" ADD CONSTRAINT "FK_311054569848024e7a68d91a1c5" FOREIGN KEY ("resourceId") REFERENCES "resource"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "project_resources_resource" DROP CONSTRAINT "FK_311054569848024e7a68d91a1c5"`);
        await queryRunner.query(`ALTER TABLE "project_resources_resource" DROP CONSTRAINT "FK_d620b3a6349ea949a20392ffe5c"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_311054569848024e7a68d91a1c"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_d620b3a6349ea949a20392ffe5"`);
        await queryRunner.query(`DROP TABLE "project_resources_resource"`);
        await queryRunner.query(`DROP TABLE "project"`);
        await queryRunner.query(`DROP TABLE "resource"`);
        await queryRunner.query(`DROP TABLE "availability_constraints"`);
    }

}
