import { MigrationInterface, QueryRunner } from 'typeorm';

export class RefactorProductTable1718987688474 implements MigrationInterface {
  name = 'RefactorProductTable1718987688474';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE \`products\` ADD \`color\` varchar(255) NOT NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE \`products\` ADD \`size\` varchar(255) NOT NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE \`products\` ADD \`style\` varchar(255) NOT NULL`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE \`products\` DROP COLUMN \`style\``);
    await queryRunner.query(`ALTER TABLE \`products\` DROP COLUMN \`size\``);
    await queryRunner.query(`ALTER TABLE \`products\` DROP COLUMN \`color\``);
  }
}
