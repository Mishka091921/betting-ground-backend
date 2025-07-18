// modules/user/domain/user.repository.ts
import { UserEntity } from './user.entity';

export abstract class UserRepository {
  abstract findByUsername(username: string): Promise<UserEntity | null>;
  abstract create(user: Partial<UserEntity>): Promise<UserEntity>;
}
