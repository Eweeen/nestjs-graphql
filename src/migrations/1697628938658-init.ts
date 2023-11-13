import { MigrationInterface, QueryRunner } from "typeorm";

export class Init1697628938658 implements MigrationInterface {
    name = 'Init1697628938658'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE \`vehicles\` (\`id\` int NOT NULL AUTO_INCREMENT, \`immatriculation\` varchar(255) NOT NULL, \`model\` varchar(255) NOT NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE \`vehicles\``);
    }

}
