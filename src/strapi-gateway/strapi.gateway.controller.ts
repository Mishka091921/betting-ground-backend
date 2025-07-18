import { Controller, Get, Post, Body, UseGuards } from '@nestjs/common';
import { StrapiGatewayService } from './strapi.gateway.service';
import { JwtAuthGuard } from 'src/common/guards/jwt-auth.guard';
import { RolesGuard } from 'src/common/guards/roles.guard';
import { Roles } from 'src/common/decorators/roles.decorator';
import { AccountType } from 'src/constants/account-type.enum';
import { Public } from 'src/common/decorators/public.decorator';

@Controller({path:'strapi', version:'1'})
@UseGuards(JwtAuthGuard) // protect with your NestJS auth
export class StrapiGatewayController {
  constructor(private readonly strapiService: StrapiGatewayService) {}

  @Public()
  @Get('banners')
  async getBanners() {
    return this.strapiService.getBanners();
  }

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(AccountType.developer, AccountType.general_admin, AccountType.general_admin)
  @Post('banners')
  async createBanner(@Body() body: any) {
    return this.strapiService.createBanner(body);
  }
}
