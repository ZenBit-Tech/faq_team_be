import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import * as bcrypt from 'bcrypt';
import { EErrorMessage } from 'src/common/enums/error-message.enum';
import { UserEntity } from 'src/entities/user.entity';
import { UserRepository } from 'src/modules/repository/services/user.repository';
import { UsersFilterDto } from 'src/modules/user/dto/filter-users.dto';
import { UpdateUserDto } from 'src/modules/user/dto/update-user.dto';
import { FindOptionsWhere, Like } from 'typeorm';

@Injectable()
export class UserService {
  constructor(
    private readonly userRepository: UserRepository,
    private readonly configService: ConfigService,
  ) {}

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

  public async getAllUsers(dto: UsersFilterDto) {
    const { page = 1, limit = 5, order = 'ASC', search = '' } = dto;
    const conditions:
      | FindOptionsWhere<UserEntity>
      | FindOptionsWhere<UserEntity>[] = search
      ? [{ full_name: Like(`%${search}%`) }, { email: Like(`%${search}%`) }]
      : {};

    const [users, totalCount] = await this.userRepository.findAndCount({
      where: conditions,
      order: { full_name: order },
      skip: (page - 1) * limit,
      take: limit,
    });
    return { totalCount, users };
  }

  public async getUser(id: string): Promise<UserEntity> {
    return await this.isUserExist(id);
  }

  public async softDelete(id: string): Promise<void> {
    const user = await this.isUserExist(id);
    user.is_deleted_by_admin = true;
    await this.userRepository.save(user);
  }
}
