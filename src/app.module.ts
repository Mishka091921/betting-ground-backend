import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PrismaModule } from './core/prisma/prisma.module';
import { UserModule } from './modules/users/v1/infrastructure/users.module';
import { SocketModule } from './modules/socket/infrastucture/socket.module';

@Module({
  imports: [
    PrismaModule, 
    UserModule,
    SocketModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
