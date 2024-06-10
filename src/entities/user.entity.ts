import { ETableName } from 'src/common/enums/table-name.enum';
import { EUserRole } from 'src/common/enums/user-role.enum';
import { EUserStatus } from 'src/common/enums/user-status.enum';
import { BaseEntity } from 'src/entities/models/base.entity';
import { Column, Entity } from 'typeorm';

@Entity(ETableName.USERS)
export class UserEntity extends BaseEntity {
  @Column()
  full_name: string;

  @Column({ unique: true })
  email: string;

  @Column({ select: false, nullable: true })
  password: string;

  @Column({ default: false })
  is_verified: boolean;

  @Column({ default: 0 })
  filled_profile_step: number;

  @Column({ nullable: true })
  otp_code: string;

  @Column({
    default: EUserStatus.REGISTRATION,
  })
  user_status: EUserStatus;

  @Column({ default: false })
  is_deleted_by_admin: boolean;

  @Column({ nullable: true })
  user_role: EUserRole;

  @Column({ nullable: true })
  avatar: string;

  @Column({ nullable: true })
  phone: string;

  @Column({ nullable: true })
  address: string;

  @Column({ nullable: true })
  address_2: string;

  @Column({ nullable: true })
  country: string;

  @Column({ nullable: true })
  city: string;

  @Column({ nullable: true })
  cloth_size: string;

  @Column({ nullable: true })
  jeans_size: string;

  @Column({ nullable: true })
  shoes_size: number;
}
