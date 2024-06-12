import { MigrationInterface, QueryRunner } from 'typeorm';

export class AddRateAndReview1718192541317 implements MigrationInterface {
  name = 'AddRateAndReview1718192541317';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE \`rates\` (\`id\` varchar(36) NOT NULL, \`created_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updated_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), \`rate\` int NOT NULL DEFAULT '5', \`rater\` varchar(255) NOT NULL, \`rate_target_id\` varchar(255) NOT NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`,
    );
    await queryRunner.query(
      `CREATE TABLE \`reviews\` (\`id\` varchar(36) NOT NULL, \`created_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updated_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), \`review_body\` varchar(255) NOT NULL, \`reviewer_id\` varchar(255) NOT NULL, \`review_target_id\` varchar(255) NOT NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`,
    );
    await queryRunner.query(
      `ALTER TABLE \`rates\` ADD CONSTRAINT \`FK_0810693cc6a896e6802ee3b44a9\` FOREIGN KEY (\`rater\`) REFERENCES \`users\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE \`rates\` ADD CONSTRAINT \`FK_1f612c036c94794df8d71d1fbaf\` FOREIGN KEY (\`rate_target_id\`) REFERENCES \`users\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`,
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
      `ALTER TABLE \`rates\` DROP FOREIGN KEY \`FK_1f612c036c94794df8d71d1fbaf\``,
    );
    await queryRunner.query(
      `ALTER TABLE \`rates\` DROP FOREIGN KEY \`FK_0810693cc6a896e6802ee3b44a9\``,
    );
    await queryRunner.query(`DROP TABLE \`reviews\``);
    await queryRunner.query(`DROP TABLE \`rates\``);
  }
}