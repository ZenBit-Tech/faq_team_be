import { Column, Entity } from 'typeorm';

import { ETableName } from './enums/table-name.enum';
import { EUserRole } from './enums/user-role.enum';
import { EUserStatus } from './enums/user-status.enum';
import { BaseEntity } from './models/base.entity';

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
    type: 'enum',
    enum: EUserStatus,
    default: EUserStatus.REGISTRATION,
  })
  user_status: EUserStatus;

  @Column({ default: false })
  is_deleted_by_admin: boolean;

  @Column({ type: 'enum', enum: EUserRole, nullable: true })
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
