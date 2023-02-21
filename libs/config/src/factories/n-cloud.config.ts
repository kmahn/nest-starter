import { registerAs } from '@nestjs/config';
import { ConfigKey } from '../config-key';

export const nCloudConfig = registerAs(ConfigKey.SMS, () => ({
  accessKey: process.env.NCLOUD_ACCESS_KEY,
  secretKey: process.env.NCLOUD_SECRET_KEY,
  smsServiceId: process.env.NCLOUD_SMS_SERVICE_ID,
  smsNumber: process.env.NCLOUD_SMS_NUMBER,
  kakaoId: process.env.NCLOUD_KAKAO_ID,
  kakaoServiceId: process.env.NCLOUD_KAKAO_SERVICE_ID,
}));
