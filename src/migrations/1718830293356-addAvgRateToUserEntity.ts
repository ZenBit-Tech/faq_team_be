import { MigrationInterface, QueryRunner } from 'typeorm';

export class AddAvgRateToUserEntity1718830293356 implements MigrationInterface {
  name = 'AddAvgRateToUserEntity1718830293356';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE \`users\` ADD \`avgRate\` int NULL`);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE \`users\` DROP COLUMN \`avgRate\``);
  }
}
