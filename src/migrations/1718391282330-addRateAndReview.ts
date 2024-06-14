import { MigrationInterface, QueryRunner } from 'typeorm';

export class AddRateAndReview1718391282330 implements MigrationInterface {
  name = 'AddRateAndReview1718391282330';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE \`rates\` ADD \`rater_id\` varchar(255) NOT NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE \`rates\` ADD \`user_target_id\` varchar(255) NOT NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE \`rates\` DROP FOREIGN KEY \`FK_0810693cc6a896e6802ee3b44a9\``,
    );
    await queryRunner.query(
      `ALTER TABLE \`rates\` DROP FOREIGN KEY \`FK_1f612c036c94794df8d71d1fbaf\``,
    );
    await queryRunner.query(`ALTER TABLE \`rates\` DROP COLUMN \`rater\``);
    await queryRunner.query(
      `ALTER TABLE \`rates\` ADD \`rater\` varchar(36) NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE \`rates\` DROP COLUMN \`rate_target_id\``,
    );
    await queryRunner.query(
      `ALTER TABLE \`rates\` ADD \`rate_target_id\` varchar(36) NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE \`rates\` ADD CONSTRAINT \`FK_0810693cc6a896e6802ee3b44a9\` FOREIGN KEY (\`rater\`) REFERENCES \`users\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE \`rates\` ADD CONSTRAINT \`FK_1f612c036c94794df8d71d1fbaf\` FOREIGN KEY (\`rate_target_id\`) REFERENCES \`users\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE \`rates\` DROP FOREIGN KEY \`FK_1f612c036c94794df8d71d1fbaf\``,
    );
    await queryRunner.query(
      `ALTER TABLE \`rates\` DROP FOREIGN KEY \`FK_0810693cc6a896e6802ee3b44a9\``,
    );
    await queryRunner.query(
      `ALTER TABLE \`rates\` DROP COLUMN \`rate_target_id\``,
    );
    await queryRunner.query(
      `ALTER TABLE \`rates\` ADD \`rate_target_id\` varchar(255) NOT NULL`,
    );
    await queryRunner.query(`ALTER TABLE \`rates\` DROP COLUMN \`rater\``);
    await queryRunner.query(
      `ALTER TABLE \`rates\` ADD \`rater\` varchar(255) NOT NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE \`rates\` ADD CONSTRAINT \`FK_1f612c036c94794df8d71d1fbaf\` FOREIGN KEY (\`rate_target_id\`) REFERENCES \`users\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE \`rates\` ADD CONSTRAINT \`FK_0810693cc6a896e6802ee3b44a9\` FOREIGN KEY (\`rater\`) REFERENCES \`users\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE \`rates\` DROP COLUMN \`user_target_id\``,
    );
    await queryRunner.query(`ALTER TABLE \`rates\` DROP COLUMN \`rater_id\``);
  }
}
