import { MigrationInterface, QueryRunner } from 'typeorm';

export class AddRateAndReview1718745166902 implements MigrationInterface {
  name = 'AddRateAndReview1718745166902';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE \`rates\` (\`id\` varchar(36) NOT NULL, \`created_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updated_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), \`rate\` int NOT NULL DEFAULT '5', \`rater_id\` varchar(255) NOT NULL, \`user_target_id\` varchar(255) NOT NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`,
    );
    await queryRunner.query(
      `CREATE TABLE \`reviews\` (\`id\` varchar(36) NOT NULL, \`created_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updated_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), \`review_text\` varchar(255) NOT NULL, \`reviewer_id\` varchar(255) NOT NULL, \`review_target_id\` varchar(255) NOT NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`,
    );
    await queryRunner.query(
      `ALTER TABLE \`rates\` ADD CONSTRAINT \`FK_4715a581a186022fc5200e39a67\` FOREIGN KEY (\`rater_id\`) REFERENCES \`users\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE \`rates\` ADD CONSTRAINT \`FK_bf45dce89a559cad5fd035868de\` FOREIGN KEY (\`user_target_id\`) REFERENCES \`users\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE \`reviews\` ADD CONSTRAINT \`FK_92e950a2513a79bb3fab273c92e\` FOREIGN KEY (\`reviewer_id\`) REFERENCES \`users\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE \`reviews\` ADD CONSTRAINT \`FK_c142da7577c373a3210865e9a9e\` FOREIGN KEY (\`review_target_id\`) REFERENCES \`users\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE \`reviews\` DROP FOREIGN KEY \`FK_c142da7577c373a3210865e9a9e\``,
    );
    await queryRunner.query(
      `ALTER TABLE \`reviews\` DROP FOREIGN KEY \`FK_92e950a2513a79bb3fab273c92e\``,
    );
    await queryRunner.query(
      `ALTER TABLE \`rates\` DROP FOREIGN KEY \`FK_bf45dce89a559cad5fd035868de\``,
    );
    await queryRunner.query(
      `ALTER TABLE \`rates\` DROP FOREIGN KEY \`FK_4715a581a186022fc5200e39a67\``,
    );
    await queryRunner.query(`DROP TABLE \`reviews\``);
    await queryRunner.query(`DROP TABLE \`rates\``);
  }
}
