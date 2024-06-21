import { UserEntity } from 'src/entities/user.entity';

export type GetAllUsersOutput = { users: UserEntity[]; totalCount: number };
