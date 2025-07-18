// modules/user/user.controller.ts
import { Controller, Post, Body, Get, UseGuards, Req, Res } from '@nestjs/common';
import { JwtAuthGuard } from 'src/common/guards/jwt-auth.guard';
import { UserService } from './users.service';
import { LoginDto } from '../application/dto/login.dto';
import { CreateUserDto } from '../application/dto/create-user.dto';
import { Request, Response } from 'express';
import { User } from 'src/common/decorators/user.decorator';
import { Roles } from 'src/common/decorators/roles.decorator';
import { AccountType } from 'src/constants/account-type.enum';
import { RolesGuard } from 'src/common/guards/roles.guard';

import {
  ApiTags,
} from '@nestjs/swagger';

import {
  SwaggerRegister,
  SwaggerLogin,
  SwaggerProfile,
  SwaggerLogout,
  SwaggerRefresh,
  SwaggerTestRole,
} from '../application/user.swagger';
import { Public } from 'src/common/decorators/public.decorator';

@ApiTags('User')
@Controller({ path: 'auth', version: '1' })
export class UserController {
  constructor(private readonly service: UserService) {}

  @Public()
  @Post('register')
  @SwaggerRegister()
  create(@Body() dto: CreateUserDto) {
    return this.service.create(dto);
  }

  @Public()
  @Post('login')
  @SwaggerLogin()
  login(@Body() dto: LoginDto, @Res() res: Response) {
    return this.service.login(dto, res);
  }

  @UseGuards(JwtAuthGuard)
  @Get('profile')
  @SwaggerProfile()
  profile(@User() user) {
    return this.service.profile(user.username);
  }

  @Post('logout')
  @SwaggerLogout()
  logout(@Res() res: Response) {
    return this.service.logout(res);
  }

  @Get('refresh')
  @SwaggerRefresh()
  refresh(@Req() req: Request) {
    return this.service.refresh(req);
  }

  
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(AccountType.player)
  @Get('test-role')
  @SwaggerTestRole()
  getSomething(@Req() req: Request) {
    return { message: 'Role check passed!', user: req.user };
  }
}
