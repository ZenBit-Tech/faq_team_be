import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import * as bcrypt from 'bcrypt';
import { EErrorMessage } from 'src/common/enums/error-message.enum';
import { ESort } from 'src/common/enums/sort.enum';
import { EUserRole } from 'src/common/enums/user-role.enum';
import { UserEntity } from 'src/entities/user.entity';
import { UserRepository } from 'src/modules/repository/services/user.repository';
import { UsersFilterDto } from 'src/modules/user/dto/filter-users.dto';
import { UpdateUserDto } from 'src/modules/user/dto/update-user.dto';
import { FindOptionsWhere, Like, Not } from 'typeorm';

@Injectable()
export class UserService {
  constructor(
    private readonly userRepository: UserRepository,
    private readonly configService: ConfigService,
  ) {}

  public async getFullInfo(id: string): Promise<UserEntity> {
    await this.isUserExist(id);
    return await this.userRepository.getFullInfo(id);
  }

  public async isUserExist(userId: string): Promise<UserEntity> {
    const user = await this.userRepository.findOneBy({ id: userId });

    if (!user) {
      throw new HttpException(
        EErrorMessage.USER_NOT_EXIST,
        HttpStatus.BAD_REQUEST,
      );
    }

    return user;
  }

  public async isEmailUnique(email: string): Promise<void> {
    const user = await this.userRepository.findOneBy({ email });

    if (user) {
      throw new HttpException(
        EErrorMessage.EMAIL_ALREADY_EXIST,
        HttpStatus.BAD_REQUEST,
      );
    }
  }

  public async updateUser(
    updateUserDto: UpdateUserDto,
    id: string,
  ): Promise<void> {
    const { password, ...dtoWithoutPassword } = updateUserDto;
    const user = await this.isUserExist(id);

    if (!user) {
      throw new HttpException(
        EErrorMessage.USER_NOT_EXIST,
        HttpStatus.BAD_REQUEST,
      );
    }

    if (password) {
      const salt = +this.configService.get('SALT');
      const hashedPassword = await bcrypt.hash(updateUserDto.password, salt);
      user.password = hashedPassword;
    }

    await this.userRepository.update(id, {
      password: user.password,
      ...dtoWithoutPassword,
    });
  }

  public async getAllUsers(
    dto: UsersFilterDto,
  ): Promise<{ totalCount: number; users: UserEntity[] }> {
    const { page = 1, limit, order = ESort.ASC, search = '' } = dto;

    const conditions:
      | FindOptionsWhere<UserEntity>
      | FindOptionsWhere<UserEntity[]> = {
      is_deleted_by_admin: false,
      user_role: Not(EUserRole.SUPERADMIN),
      ...(search
        ? { full_name: Like(`%${search}%`), email: Like(`%${search}%`) }
        : {}),
    };

    const [users, totalCount] = await this.userRepository.findAndCount({
      where: conditions,
      order: { full_name: order },
      skip: limit ? (page - 1) * limit : 0,
      take: limit,
    });
    return { totalCount, users };
  }

  public async softDelete(id: string): Promise<void> {
    const user = await this.isUserExist(id);
    user.is_deleted_by_admin = true;
    await this.userRepository.save(user);
  }
}
