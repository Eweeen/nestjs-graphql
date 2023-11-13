import { MigrationInterface, QueryRunner } from "typeorm";

export class AddPark1697629954914 implements MigrationInterface {
    name = 'AddPark1697629954914'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE \`parks\` (\`id\` int NOT NULL AUTO_INCREMENT, \`name\` varchar(255) NOT NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`ALTER TABLE \`vehicles\` ADD \`park_id\` int NULL`);
        await queryRunner.query(`ALTER TABLE \`vehicles\` ADD CONSTRAINT \`FK_9d56089621ee8d86337402b0631\` FOREIGN KEY (\`park_id\`) REFERENCES \`parks\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`vehicles\` DROP FOREIGN KEY \`FK_9d56089621ee8d86337402b0631\``);
        await queryRunner.query(`ALTER TABLE \`vehicles\` DROP COLUMN \`park_id\``);
        await queryRunner.query(`DROP TABLE \`parks\``);
    }

}
