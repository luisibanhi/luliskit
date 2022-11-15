import { MigrationInterface, QueryRunner } from "typeorm";

export class GenerateBookingTable1668519868772 implements MigrationInterface {
    name = 'GenerateBookingTable1668519868772'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TYPE "public"."booking_state_enum" AS ENUM('confirmed', 'completed', 'cancelled', 'cancelled_by_customer')`);
        await queryRunner.query(`CREATE TABLE "booking" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "isActive" boolean NOT NULL DEFAULT true, "isArchived" boolean NOT NULL DEFAULT false, "created_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "updated_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "createdBy" character varying(300) NOT NULL, "state" "public"."booking_state_enum" NOT NULL DEFAULT 'confirmed', "user" json NOT NULL, "start" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "end" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "resource_id" uuid, CONSTRAINT "PK_49171efc69702ed84c812f33540" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "booking" ADD CONSTRAINT "booking_resource_fk" FOREIGN KEY ("resource_id") REFERENCES "resource"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "booking" DROP CONSTRAINT "booking_resource_fk"`);
        await queryRunner.query(`DROP TABLE "booking"`);
        await queryRunner.query(`DROP TYPE "public"."booking_state_enum"`);
    }

}
