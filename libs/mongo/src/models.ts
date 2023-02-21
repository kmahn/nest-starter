import { ModelDefinition } from '@nestjs/mongoose';
import { CollectionName, ModelName } from './constants';
import { AuthCodeSchema, AuthSchema, TokenSchema, UserSchema } from './schemas';

export const models: ModelDefinition[] = [
  {
    name: ModelName.AUTH,
    collection: CollectionName.AUTH,
    schema: AuthSchema,
  },
  {
    name: ModelName.AUTH_CODE,
    collection: CollectionName.AUTH_CODE,
    schema: AuthCodeSchema,
  },
  {
    name: ModelName.TOKEN,
    collection: CollectionName.TOKEN,
    schema: TokenSchema,
  },
  {
    name: ModelName.USER,
    collection: CollectionName.USER,
    schema: UserSchema,
  },
];
