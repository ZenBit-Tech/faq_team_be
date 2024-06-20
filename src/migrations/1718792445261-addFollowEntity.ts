import { MigrationInterface, QueryRunner } from 'typeorm';

export class AddFollowEntity1718792445261 implements MigrationInterface {
  name = 'AddFollowEntity1718792445261';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE \`follows\` (\`id\` varchar(36) NOT NULL, \`created_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updated_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), \`follower_id\` varchar(255) NOT NULL, \`following_id\` varchar(255) NOT NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`,
    );
    await queryRunner.query(
      `ALTER TABLE \`follows\` ADD CONSTRAINT \`FK_54b5dc2739f2dea57900933db66\` FOREIGN KEY (\`follower_id\`) REFERENCES \`users\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE \`follows\` ADD CONSTRAINT \`FK_c518e3988b9c057920afaf2d8c0\` FOREIGN KEY (\`following_id\`) REFERENCES \`users\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE \`follows\` DROP FOREIGN KEY \`FK_c518e3988b9c057920afaf2d8c0\``,
    );
    await queryRunner.query(
      `ALTER TABLE \`follows\` DROP FOREIGN KEY \`FK_54b5dc2739f2dea57900933db66\``,
    );
    await queryRunner.query(`DROP TABLE \`follows\``);
  }
}
