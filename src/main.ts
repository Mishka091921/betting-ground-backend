import { NestFactory, Reflector } from '@nestjs/core';
import { AppModule } from './app.module';
import * as cookieParser from 'cookie-parser';
import { ValidationPipe, VersioningType } from '@nestjs/common';
import { PrismaExceptionFilter } from './common/filters/prisma-exception.filter';
import { RolesGuard } from './common/guards/roles.guard';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';


async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true, 
      forbidNonWhitelisted: true,
      transform: true,
    }),
  );

    // Swagger config setup
  const config = new DocumentBuilder()
    .setTitle('My API')                // API title
    .setDescription('API description') // API description
    .setVersion('1.0')                 // API version
    // .addBearerAuth()                 // Uncomment if using JWT Bearer auth
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document); // Swagger UI available at http://localhost:3000/api


  
  app.enableCors(); // required if CORS is blocked
  app.setGlobalPrefix('api');
  const reflector = app.get(Reflector);
  app.useGlobalGuards(new RolesGuard(reflector));
  app.use(cookieParser()); 
  app.useGlobalFilters(new PrismaExceptionFilter()); 
  app.enableVersioning({
    type: VersioningType.URI,
    defaultVersion: '1',
  });

  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
