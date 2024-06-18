import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PaymentMethod } from '@stripe/stripe-js';
import { EErrorMessage } from 'src/common/enums/error-message.enum';
import { UserRepository } from 'src/modules/repository/services/user.repository';
import { AddressDto } from 'src/modules/user/dto/fillProfileDtos/address.dto';
import { GeneralInfoDto } from 'src/modules/user/dto/fillProfileDtos/generalInfo.dto';
import { SizesDto } from 'src/modules/user/dto/fillProfileDtos/sizes.dto';
import Stripe from 'stripe';

import { RoleDto } from '../dto/fillProfileDtos/role.dto';

@Injectable()
export class FillProfileService {
  constructor(
    private readonly userRepository: UserRepository,
    private readonly configService: ConfigService,
  ) {}

  async saveRole(roleDto: RoleDto): Promise<void> {
    const fillProfileStep = 1;
    const user = await this.userRepository.findOneBy({ id: roleDto.id });

    if (!user) {
      throw new HttpException(
        EErrorMessage.USER_NOT_EXIST,
        HttpStatus.BAD_REQUEST,
      );
    }

    if (user.filled_profile_step < fillProfileStep) {
      user.filled_profile_step = fillProfileStep;
    }

    user.user_role = roleDto.role;
    await this.userRepository.save(user);
  }

  async saveAddress(addressDto: AddressDto): Promise<void> {
    const fillProfileStep = 3;
    const user = await this.userRepository.findOneBy({ id: addressDto.id });

    if (!user) {
      throw new HttpException(
        EErrorMessage.USER_NOT_EXIST,
        HttpStatus.BAD_REQUEST,
      );
    }

    if (user.filled_profile_step < fillProfileStep) {
      user.filled_profile_step = fillProfileStep;
    }

    user.address = addressDto.address1;
    user.address_2 = addressDto.address2;
    user.country = addressDto.country;
    user.state = addressDto.state;
    user.city = addressDto.city;
    await this.userRepository.save(user);
  }

  async saveSizes(sizesDto: SizesDto): Promise<void> {
    const fillProfileStep = 5;

    const user = await this.userRepository.findOneBy({ id: sizesDto.id });

    if (!user) {
      throw new HttpException(
        EErrorMessage.USER_NOT_EXIST,
        HttpStatus.BAD_REQUEST,
      );
    }

    if (user.filled_profile_step < fillProfileStep) {
      user.filled_profile_step = fillProfileStep;
    }

    user.cloth_size = sizesDto.clothSize;
    user.shoes_size = sizesDto.shoesSize;
    user.jeans_size = sizesDto.jeansSize;
    await this.userRepository.save(user);
  }
}
