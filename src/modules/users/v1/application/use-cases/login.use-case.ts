// modules/user/application/use-cases/login.use-case.ts
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcryptjs';
import { UserRepository } from '../../domain/user.repository';
import { LoginDto } from '../dto/login.dto';
import { Response } from 'express';


@Injectable()
export class LoginUseCase {
  constructor(
    private readonly userRepo: UserRepository,
    private readonly jwtService: JwtService,
  ) {}

  async execute(loginDto: LoginDto,res: Response) {

    console.log("Login")
    
    const user = await this.userRepo.findByUsername(loginDto.username);
    if (!user || !(await bcrypt.compare(loginDto.password, user.password))) {
      throw new UnauthorizedException();
    }

    const accessToken = this.jwtService.sign(
      { sub: user.id, username: user.username, type: user.type },
      { expiresIn: '1d' },
    );

    const refreshToken = this.jwtService.sign(
      { sub: user.id },
      { expiresIn: loginDto.rememberMe ? '7d' : '1d' }
    );


    res.cookie('refresh_token', refreshToken, {
      httpOnly: true,
      secure: true,
      sameSite: 'strict',
      maxAge: loginDto.rememberMe ? 7 * 86400000 : 86400000,
    });

  return res.json({
    access_token: accessToken,
    user: {
      id: user.id,
      username: user.username,
      type: user.type,
    },
  });
  }
}
