import { MigrationInterface, QueryRunner } from 'typeorm';

export class ChangeUserStatus1717582467152 implements MigrationInterface {
  name = 'ChangeUserStatus1717582467152';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE \`users\` CHANGE \`user_status\` \`user_status\` enum ('active', 'inactive', 'registration') NOT NULL DEFAULT 'registration'`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE \`users\` CHANGE \`user_status\` \`user_status\` enum ('active', 'inactive') NULL`,
    );
  }
}
