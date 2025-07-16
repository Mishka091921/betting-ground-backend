// modules/user/user.controller.ts
import { Controller, Post, Body, Get, UseGuards, Req, Res } from '@nestjs/common';
import { JwtAuthGuard } from 'src/common/guards/jwt-auth.guard';
import { UserService } from './users.service';
import { LoginDto } from './application/dto/login.dto';
import { CreateUserDto } from './application/dto/create-user.dto';
import { Request, Response } from 'express';
import { User } from 'src/common/decorators/user.decorator';

@Controller({path:'user', version: '1'})
export class UserController {
  constructor(private readonly service: UserService) {}
 @Post('register')
  create(@Body() dto: CreateUserDto) {
    return this.service.create(dto);
  }

  @Post('login')
  login(@Body() dto: LoginDto, @Res() res: Response) {
    return this.service.login(dto, res);
  }

  @UseGuards(JwtAuthGuard)
  @Get('profile')
  profile(@User() user) {
    return this.service.profile(user.username);
  }

  @Post('logout')
  logout(@Res() res: Response) {
    return this.service.logout(res);
  }

  @Get('refresh')
  refresh(@Req() req: Request) {
    return this.service.refresh(req);
  }
}
