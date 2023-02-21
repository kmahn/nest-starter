import { RepositoryQueryMapper } from '@leaf/repository';
import mongoose, { Document, Model } from 'mongoose';
import { ModelName } from '../constants';

export async function toRef<T, D extends Document & T>(
  modelName: ModelName,
  value: string,
  refMappers: RepositoryQueryMapper<T>,
) {
  const model: Model<D> = mongoose.model(modelName) as Model<D>;
  const $match = { $or: [] };
  const keys = Object.keys(refMappers);

  if (keys.length === 0) return undefined;

  const $or = await Promise.all(
    keys.map(async (key) => {
      const f = {};
      f[key] = await refMappers[key](value);
      return f[key] !== undefined ? f : undefined;
    }),
  );

  $match.$or = $or.filter((v) => !!v);

  const $in = (await model.aggregate([{ $match }]).allowDiskUse(true)).map(
    (document) => document._id,
  );

  return { $in };
}
