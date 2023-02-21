import { Environment } from './types';

export const environmentDev: Environment = {
  version: '0.0.1',
  cors: {
    origin: ['http://localhost:5173', 'http://localhost:3000'],
    methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE', 'OPTIONS'],
  },
};
