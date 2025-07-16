// modules/user/users.service.ts
import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './application/dto/create-user.dto';
import { LoginDto } from './application/dto/login.dto';
import { CreateUserUseCase } from './application/use-cases/create-user.use-case';
import { LoginUseCase } from './application/use-cases/login.use-case';
import { GetProfileUseCase } from './application/use-cases/get-profile.use-case';
import { LogoutUseCase } from './application/use-cases/logout.use-case';
import { RefreshTokenUseCase } from './application/use-cases/refresh-token.use-case';
import { Request, Response } from 'express';
@Injectable()
export class UserService {
  constructor(
    private readonly createUser: CreateUserUseCase,
    private readonly loginUser: LoginUseCase,
    private readonly getProfile: GetProfileUseCase,
    private readonly logoutUser: LogoutUseCase,
    private readonly refreshToken: RefreshTokenUseCase
  ) {}

   async create(dto: CreateUserDto) {
    return this.createUser.execute(dto);
  }

  async login(dto: LoginDto, res: Response) {
    return this.loginUser.execute(dto, res);
  }

  async profile(userId: string) {
    return this.getProfile.execute(userId);
  }

  async logout(res: Response) {
    return this.logoutUser.execute(res);
  }

  async refresh(req: Request) {
    return this.refreshToken.execute(req);
  }
}
