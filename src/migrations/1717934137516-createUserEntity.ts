import { MigrationInterface, QueryRunner } from 'typeorm';

export class CreateUserEntity1717934137516 implements MigrationInterface {
  name = 'CreateUserEntity1717934137516';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE \`users\` DROP COLUMN \`user_name\``);
    await queryRunner.query(
      `ALTER TABLE \`users\` ADD \`full_name\` varchar(255) NOT NULL`,
    );
    await queryRunner.query(`ALTER TABLE \`users\` DROP COLUMN \`user_role\``);
    await queryRunner.query(
      `ALTER TABLE \`users\` ADD \`user_role\` varchar(255) NULL`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE \`users\` DROP COLUMN \`user_role\``);
    await queryRunner.query(
      `ALTER TABLE \`users\` ADD \`user_role\` enum ('buyer', 'vendor') NULL`,
    );
    await queryRunner.query(`ALTER TABLE \`users\` DROP COLUMN \`full_name\``);
    await queryRunner.query(
      `ALTER TABLE \`users\` ADD \`user_name\` varchar(255) NOT NULL`,
    );
  }
}
