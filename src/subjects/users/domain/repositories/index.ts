import { Provider } from '@nestjs/common';
import { UserRepositoryImpl } from './impl';
import { UserRepository } from './user.repository';

export * from './user.repository';

export const Repositories: Provider[] = [
  { provide: UserRepository, useClass: UserRepositoryImpl },
];
