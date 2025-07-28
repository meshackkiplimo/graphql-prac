import { MigrationInterface, QueryRunner } from 'typeorm';

export class CreateServiceCatalogueEntities1706545200000 implements MigrationInterface {
    name = 'CreateServiceCatalogueEntities1706545200000';

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            CREATE TABLE "service" (
                "id" varchar PRIMARY KEY NOT NULL,
                "createdAt" datetime NOT NULL DEFAULT (datetime('now')),
                "updatedAt" datetime NOT NULL DEFAULT (datetime('now')),
                "title" varchar NOT NULL,
                "category" varchar NOT NULL,
                "tags" text NOT NULL,
                "summary" text NOT NULL,
                "description" text NOT NULL,
                "targetStakeholder" varchar NOT NULL,
                "isActive" boolean NOT NULL DEFAULT (1)
            )
        `);

        await queryRunner.query(`
            CREATE TABLE "service_enquiry" (
                "id" varchar PRIMARY KEY NOT NULL,
                "createdAt" datetime NOT NULL DEFAULT (datetime('now')),
                "updatedAt" datetime NOT NULL DEFAULT (datetime('now')),
                "serviceId" varchar NOT NULL,
                "userEmail" varchar NOT NULL,
                "userName" varchar NOT NULL,
                "message" text NOT NULL,
                "status" varchar NOT NULL DEFAULT ('pending'),
                CONSTRAINT "FK_service_enquiry_serviceId" FOREIGN KEY ("serviceId") REFERENCES "service" ("id") ON DELETE CASCADE ON UPDATE NO ACTION
            )
        `);

        await queryRunner.query(`
            CREATE TABLE "service_follow" (
                "id" varchar PRIMARY KEY NOT NULL,
                "createdAt" datetime NOT NULL DEFAULT (datetime('now')),
                "updatedAt" datetime NOT NULL DEFAULT (datetime('now')),
                "serviceId" varchar NOT NULL,
                "userId" varchar NOT NULL,
                CONSTRAINT "FK_service_follow_serviceId" FOREIGN KEY ("serviceId") REFERENCES "service" ("id") ON DELETE CASCADE ON UPDATE NO ACTION
            )
        `);

        await queryRunner.query(`
            CREATE INDEX "IDX_service_category" ON "service" ("category")
        `);

        await queryRunner.query(`
            CREATE INDEX "IDX_service_targetStakeholder" ON "service" ("targetStakeholder")
        `);

        await queryRunner.query(`
            CREATE INDEX "IDX_service_enquiry_serviceId" ON "service_enquiry" ("serviceId")
        `);

        await queryRunner.query(`
            CREATE INDEX "IDX_service_follow_serviceId" ON "service_follow" ("serviceId")
        `);

        await queryRunner.query(`
            CREATE UNIQUE INDEX "IDX_service_follow_unique" ON "service_follow" ("serviceId", "userId")
        `);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP INDEX "IDX_service_follow_unique"`);
        await queryRunner.query(`DROP INDEX "IDX_service_follow_serviceId"`);
        await queryRunner.query(`DROP INDEX "IDX_service_enquiry_serviceId"`);
        await queryRunner.query(`DROP INDEX "IDX_service_targetStakeholder"`);
        await queryRunner.query(`DROP INDEX "IDX_service_category"`);
        await queryRunner.query(`DROP TABLE "service_follow"`);
        await queryRunner.query(`DROP TABLE "service_enquiry"`);
        await queryRunner.query(`DROP TABLE "service"`);
    }
}