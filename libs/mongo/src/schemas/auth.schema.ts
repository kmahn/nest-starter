import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import {
  AuthEntity,
  AuthProvider,
  AUTH_PROVIDERS,
  IdType,
} from '@leaf/types';
import { compareSync, hashSync } from 'bcrypt';
import mongoose, { Model } from 'mongoose';
import { BaseDocument } from './base.document';

@Schema({ versionKey: false, timestamps: true })
export class AuthDocument extends BaseDocument implements AuthEntity {
  @Prop({ type: String, enum: AUTH_PROVIDERS, required: true })
  provider: AuthProvider;

  @Prop({ type: String, required: true })
  providerId: string;

  @Prop({ type: String })
  hashedPassword?: string;

  @Prop({ type: mongoose.Schema.Types.ObjectId })
  user: IdType;

  password: string;
  authenticate: (password: string) => boolean;
}

export const AuthSchema = SchemaFactory.createForClass(AuthDocument);
export type AuthModel = Model<AuthDocument>;

AuthSchema.virtual('password').set(function (password: string) {
  this.hashedPassword = hashSync(password, 12);
});

AuthSchema.methods.authenticate = function (password: string) {
  return compareSync(password, this.hashedPassword);
};
