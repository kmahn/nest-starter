import { Inject, Injectable } from '@nestjs/common';
import { ConfigType } from '@nestjs/config';
import { sesConfig } from '@leaf/config';
import * as aws from 'aws-sdk';
import { createTransport, Transporter } from 'nodemailer';
import { EmailOptions } from '../types';

@Injectable()
export class EmailService {
  private _transporter: Transporter;

  constructor(
    @Inject(sesConfig.KEY) private _sesConfig: ConfigType<typeof sesConfig>,
  ) {
    this._transporter = createTransport({
      SES: new aws.SES(this._sesConfig),
    });
  }

  async sendMail(options: EmailOptions) {
    await this._transporter.sendMail(options);
  }
}
