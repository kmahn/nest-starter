import { Inject } from '@nestjs/common';
import { ConfigType } from '@nestjs/config';
import { EventsHandler, IEventHandler } from '@nestjs/cqrs';
import { appConfig, emailAddressConfig } from '@leaf/config';
import { EmailService } from '@leaf/email';
import { SmsService } from '@leaf/sms';
import { AuthCodeRequestType } from '@leaf/types';
import { AuthCodeCreatedEvent } from '../impl';

@EventsHandler(AuthCodeCreatedEvent)
export class AuthCodeCreatedHandler
  implements IEventHandler<AuthCodeCreatedEvent>
{
  constructor(
    @Inject(appConfig.KEY)
    private readonly _appConfig: ConfigType<typeof appConfig>,
    @Inject(emailAddressConfig.KEY)
    private readonly _emailAddressConfig: ConfigType<typeof emailAddressConfig>,
    private readonly _emailService: EmailService,
    private readonly _smsService: SmsService,
  ) {}

  async handle(event: AuthCodeCreatedEvent) {
    const { key, type, value } = event;
    if (type === AuthCodeRequestType.EMAIL) {
      await this._sendEmail(key, value);
    } else if (type === AuthCodeRequestType.PHONE) {
      await this._sendSms(key, value);
    }
  }

  private async _sendEmail(to: string, value: string) {
    const { appName } = this._appConfig;
    const html = /*html*/ `<h1>인증번호발송</h1><p>${value}</p>`;

    await this._emailService.sendMail({
      subject: `[${appName}] 인증번호전송`,
      from: this._emailAddressConfig.noReply,
      to,
      html,
    });
  }

  private async _sendSms(to: string, value: string) {
    const { appName } = this._appConfig;

    await this._smsService.sendSms({
      subject: `[${appName}] 인증번호 발송`,
      to,
      content: `${appName} 인증번호 [${value}]를 입력해주세요.`,
    });
  }
}
