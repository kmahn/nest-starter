import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { IdType } from '@leaf/types';
import mongoose, { Model } from 'mongoose';
import { BaseDocument } from './base.document';

@Schema({ versionKey: false })
export class TokenDocument extends BaseDocument {
  @Prop({ type: mongoose.Schema.Types.ObjectId, required: true })
  user: IdType;

  @Prop({ type: String, unique: true, required: true })
  refreshToken: string;

  @Prop({ type: Date, default: Date.now, expires: '30d' })
  createdAt?: Date;
}

export const TokenSchema = SchemaFactory.createForClass(TokenDocument);
export type TokenModel = Model<TokenDocument>;
