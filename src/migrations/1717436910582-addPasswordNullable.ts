import { MigrationInterface, QueryRunner } from 'typeorm';

export class AddPasswordNullable1717436910582 implements MigrationInterface {
  name = 'AddPasswordNullable1717436910582';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE \`users\` CHANGE \`password\` \`password\` varchar(255) NULL`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE \`users\` CHANGE \`password\` \`password\` varchar(255) NOT NULL`,
    );
  }
}
