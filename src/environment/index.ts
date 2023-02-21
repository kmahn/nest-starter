import { environmentDev } from './environment.dev';
import { environmentProd } from './environment.prod';
import { environmentStage } from './environment.stage';
import { Environment } from './types';

const env: string = process.env['NODE' + '_ENV'] || 'development';

export const environment: Environment =
  env === 'production'
    ? environmentProd
    : env === 'stage'
    ? environmentStage
    : environmentDev;
