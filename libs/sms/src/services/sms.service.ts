import { HttpService } from '@nestjs/axios';
import { Inject, Injectable } from '@nestjs/common';
import { ConfigType } from '@nestjs/config';
import { nCloudConfig } from '@leaf/config';
import * as cryptoJs from 'crypto-js';
import { lastValueFrom } from 'rxjs';
import { SmsOptions } from '../types';

@Injectable()
export class SmsService {
  readonly accessKey: string;
  readonly from: string;
  readonly url: string;

  constructor(
    @Inject(nCloudConfig.KEY)
    private readonly _nCloudConfig: ConfigType<typeof nCloudConfig>,
    private readonly _httpService: HttpService,
  ) {
    const { accessKey, smsNumber, smsServiceId } = this._nCloudConfig;
    this.accessKey = accessKey;
    this.from = smsNumber;
    this.url = `https://sens.apigw.ntruss.com/sms/v2/services/${smsServiceId}/messages`;
  }

  async sendSms({ subject, to, content }: SmsOptions) {
    const body = {
      type: 'SMS',
      from: this.from,
      content,
      messages: [{ to, subject }],
    };

    await lastValueFrom(
      this._httpService.post(this.url, body, { headers: this._headers }),
    );
  }

  private get _headers() {
    const date = Date.now().toString();
    return {
      'Content-Type': 'application/json; charset=utf-8',
      'x-ncp-iam-access-key': this.accessKey,
      'x-ncp-apigw-timestamp': date,
      'x-ncp-apigw-signature-v2': this._createSignature(date),
    };
  }

  private _createSignature(date: string): string {
    const { accessKey, secretKey, smsServiceId } = this._nCloudConfig;
    const hmac = cryptoJs.algo.HMAC.create(cryptoJs.algo.SHA256, secretKey);
    hmac.update('POST');
    hmac.update(' ');
    hmac.update(`/sms/v2/services/${smsServiceId}/messages`);
    hmac.update('\n');
    hmac.update(date);
    hmac.update(`\n`);
    hmac.update(accessKey);
    return hmac.finalize().toString(cryptoJs.enc.Base64);
  }
}
