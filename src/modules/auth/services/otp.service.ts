import {
  BadRequestException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import * as randomize from 'randomatic';
import { EErrorMessage } from 'src/common/enums/error-message.enum';
import { UserDto } from 'src/modules/auth/dto/user.response.dto';
import { EMailTemplate } from 'src/modules/mail/enums/mail-template.enum';
import { ESubjectName } from 'src/modules/mail/enums/subject-name.enum';
import { MailService } from 'src/modules/mail/mail.service';
import { UserRepository } from 'src/modules/repository/services/user.repository';
import { otpGeneratorParams } from 'src/utils/generalConstants';

@Injectable()
export class OtpService {
  constructor(
    private readonly userRepository: UserRepository,
    private readonly mailService: MailService,
  ) {}

  async sendOtp(email: string): Promise<void> {
    const user = await this.userRepository.findOneBy({ email });

    if (!user) {
      throw new BadRequestException(EErrorMessage.USER_NOT_EXIST);
    }

    const otp = randomize(
      otpGeneratorParams.pattern,
      otpGeneratorParams.length,
    );

    await Promise.all([
      await this.userRepository.save(
        this.userRepository.create({ ...user, otp_code: otp }),
      ),
      await this.mailService.sendMail(
        user.email,
        ESubjectName.VERIFY,
        EMailTemplate.VERIFY,
        { otp_code: otp, name: user.full_name },
      ),
    ]);
  }

  public async verifyOtp(email: string, otp_code: string): Promise<UserDto> {
    const user = await this.userRepository.findOneBy({ email });

    if (!user) {
      throw new UnauthorizedException(EErrorMessage.USER_NOT_EXIST);
    }

    await this.userRepository.save({ ...user, is_verified: false });

    if (user.otp_code !== otp_code) {
      throw new UnauthorizedException(EErrorMessage.OTP_INCORRECT);
    }

    return await this.userRepository.save({
      ...user,
      is_verified: true,
    });
  }
}
