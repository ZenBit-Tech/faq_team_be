import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { MailerService } from '@nestjs-modules/mailer';

import { EMailTemplate } from 'src/modules/mail/enums/mail-template.enum';
import { ESubjectName } from 'src/modules/mail/enums/subject-name.enum';

@Injectable()
export class MailService {
  constructor(
    private readonly mailerService: MailerService,
    private readonly configService: ConfigService,
  ) {}

  public async sendMail(
    recipient: string,
    subject: ESubjectName,
    template: EMailTemplate,
    context: Record<string, string | number> = {},
  ): Promise<void> {
    await this.mailerService.sendMail({
      to: recipient,
      from: this.configService.get<string>('MAIL_USER'),
      subject,
      template,
      context,
    });
  }
}
