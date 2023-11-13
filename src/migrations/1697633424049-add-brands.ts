import { MigrationInterface, QueryRunner } from "typeorm";

export class AddBrands1697633424049 implements MigrationInterface {
    name = 'AddBrands1697633424049'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE \`brands\` (\`id\` int NOT NULL AUTO_INCREMENT, \`name\` varchar(255) NOT NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`ALTER TABLE \`parks\` ADD \`brand_id\` int NULL`);
       await queryRunner.query(`ALTER TABLE \`parks\` ADD CONSTRAINT \`FK_9b9cd75f184a232eef85a978347\` FOREIGN KEY (\`brand_id\`) REFERENCES \`brands\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`parks\` DROP FOREIGN KEY \`FK_9b9cd75f184a232eef85a978347\``);
        await queryRunner.query(`ALTER TABLE \`parks\` DROP COLUMN \`brand_id\``);
        await queryRunner.query(`DROP TABLE \`brands\``);
    }

}
