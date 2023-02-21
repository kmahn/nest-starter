import { Logger } from '@nestjs/common';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import {
  IdType,
  UserEntity,
  UserProfile,
  UserRole,
  USER_ROLES,
} from '@leaf/types';
import mongoose, { Model } from 'mongoose';
import { BaseDocument } from './base.document';

@Schema({ versionKey: false, timestamps: true })
export class UserDocument extends BaseDocument implements UserEntity {
  @Prop({ type: String, enum: USER_ROLES, required: true })
  role: UserRole;

  @Prop({
    type: String,
    lowercase: true,
    trim: true,
    unique: true,
    sparse: true,
  })
  email?: string;

  @Prop({ type: String, trim: true, unique: true, sparse: true })
  phone?: string;

  @Prop({ type: String, default: null, index: true, trim: true })
  nickname?: string | null;

  @Prop({ type: mongoose.Schema.Types.ObjectId, default: null })
  auth?: IdType | null;

  @Prop({ type: Date, default: null })
  accessDate?: Date | null;

  profile: UserProfile;
}

export const UserSchema = SchemaFactory.createForClass(UserDocument);
export type UserModel = Model<UserDocument>;

UserSchema.virtual('profile').get(function (): UserProfile {
  Logger.debug('call user profile');
  return {
    _id: this._id,
    role: this.role,
  };
});
