import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { AuthCodeEntity } from '@leaf/types';
import { ObjectId } from 'mongodb';
import { Model } from 'mongoose';
import { BaseDocument } from './base.document';

@Schema({ versionKey: false })
export class AuthCodeDocument extends BaseDocument implements AuthCodeEntity {
  @Prop({ type: String, required: true })
  value: string;

  @Prop({ type: String, unique: true, required: true })
  key: string;

  @Prop({ type: String, default: Date.now, expires: '10m' })
  createdAt?: Date;
}

export const AuthCodeSchema = SchemaFactory.createForClass(AuthCodeDocument);
export interface AuthCodeModel extends Model<AuthCodeDocument> {
  createAuthCode: (key: string, size?: number) => Promise<string>;
}

AuthCodeSchema.statics.createAuthCode = async function (key: string, size = 6) {
  const NUMBERS = '0123456789'.split('');
  let value = NUMBERS.slice(1).sort(() => Math.random() - 0.5)[0];
  while (--size) value += NUMBERS.sort(() => Math.random() - 0.5)[0];

  await this.deleteMany({ key });
  await this.create({ _id: new ObjectId(), key, value });

  return value;
};
