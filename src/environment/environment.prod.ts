import { Environment } from './types';

export const environmentProd: Environment = {
  version: '0.0.1',
  cors: {
    origin: ['https://localhost:5173'],
    methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE', 'OPTIONS'],
  },
};
