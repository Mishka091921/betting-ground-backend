import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PrismaModule } from './core/prisma/prisma.module';
import { UserModule } from './modules/users/v1/infrastructure/users.module';
import { SocketModule } from './modules/socket/infrastucture/socket.module';
import { RolesGuard } from './common/guards/roles.guard';
import { APP_GUARD } from '@nestjs/core';
// import { JwtAuthGuard } from './common/guards/jwt-auth.guard';

import {JwtAuthGuard} from '../../lib/guards/jwt.guard'

@Module({
  imports: [
    PrismaModule, 
    UserModule,
    SocketModule
  ],
  controllers: [AppController],
  providers: [AppService,  {
      provide: APP_GUARD,
      useClass: JwtAuthGuard,   // register JWT guard globally
    },
    {
      provide: APP_GUARD,
      useClass: RolesGuard,     // register RolesGuard globally
    },
  ],
})
export class AppModule {}
