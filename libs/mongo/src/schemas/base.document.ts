import { Prop } from '@nestjs/mongoose';
import { IdBaseEntity, IdType } from '@leaf/types';
import mongoose, { Document } from 'mongoose';

export class BaseDocument extends Document implements IdBaseEntity {
  @Prop({ type: mongoose.Schema.Types.ObjectId })
  _id: IdType;
}
