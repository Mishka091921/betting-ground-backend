// modules/user/user.module.ts
import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { JwtStrategy } from './jwt.strategy';
import { UserRepositoryImpl } from './user.repository.impl';
import { UserRepository } from '../domain/user.repository';
import { UserService } from './users.service';
import { CreateUserUseCase } from '../application/use-cases/create-user.use-case';
import { LoginUseCase } from '../application/use-cases/login.use-case';
import { GetProfileUseCase } from '../application/use-cases/get-profile.use-case';
import { UserController } from './users.controller';
import { RefreshTokenUseCase } from '../application/use-cases/refresh-token.use-case';
import { LogoutUseCase } from '../application/use-cases/logout.use-case';

@Module({
  imports: [
    JwtModule.register({
      secret: process.env.JWT_SECRET,
      signOptions: { expiresIn: '12h' },
    }),
  ],
  controllers: [UserController],
  providers: [
    CreateUserUseCase,
    LoginUseCase,
    GetProfileUseCase,
    RefreshTokenUseCase,
    LogoutUseCase,
    UserService,
    JwtStrategy,
    {
      provide: UserRepository,
      useClass: UserRepositoryImpl,
    },
  ],
})
export class UserModule {}
