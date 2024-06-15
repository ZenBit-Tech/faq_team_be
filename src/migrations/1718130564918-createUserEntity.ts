import { MigrationInterface, QueryRunner } from 'typeorm';

export class CreateUserEntity1718130564918 implements MigrationInterface {
  name = 'CreateUserEntity1718130564918';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE \`users\` (\`id\` varchar(36) NOT NULL, \`created_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updated_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), \`full_name\` varchar(255) NOT NULL, \`email\` varchar(255) NOT NULL, \`password\` varchar(255) NULL, \`is_verified\` tinyint NOT NULL DEFAULT 0, \`filled_profile_step\` int NOT NULL DEFAULT '0', \`otp_code\` varchar(255) NULL, \`user_status\` varchar(255) NOT NULL DEFAULT 'registration', \`is_deleted_by_admin\` tinyint NOT NULL DEFAULT 0, \`user_role\` varchar(255) NULL, \`avatar\` varchar(255) NULL, \`phone\` varchar(255) NULL, \`address\` varchar(255) NULL, \`address_2\` varchar(255) NULL, \`country\` varchar(255) NULL, \`city\` varchar(255) NULL, \`cloth_size\` varchar(255) NULL, \`jeans_size\` varchar(255) NULL, \`shoes_size\` int NULL, UNIQUE INDEX \`IDX_97672ac88f789774dd47f7c8be\` (\`email\`), PRIMARY KEY (\`id\`)) ENGINE=InnoDB`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `DROP INDEX \`IDX_97672ac88f789774dd47f7c8be\` ON \`users\``,
    );
    await queryRunner.query(`DROP TABLE \`users\``);
  }
}
