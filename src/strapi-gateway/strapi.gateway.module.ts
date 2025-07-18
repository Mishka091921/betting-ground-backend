import { Module } from '@nestjs/common';
import { HttpModule } from '@nestjs/axios';
import { ConfigModule } from '@nestjs/config';
import { StrapiGatewayService } from './strapi.gateway.service';
import { StrapiGatewayController } from './strapi.gateway.controller';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }), // Load env globally
    HttpModule,
  ],
  controllers:[StrapiGatewayController],
  providers: [StrapiGatewayService],
  exports: [StrapiGatewayService],
})
export class StrapiGatewayModule {}
