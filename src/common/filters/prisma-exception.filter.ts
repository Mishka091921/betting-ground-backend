import {
  ExceptionFilter,
  Catch,
  ArgumentsHost,
  HttpStatus,
} from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { Response } from 'express';

@Catch(Prisma.PrismaClientKnownRequestError)
export class PrismaExceptionFilter implements ExceptionFilter {
  catch(exception: Prisma.PrismaClientKnownRequestError, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();

    let status = HttpStatus.INTERNAL_SERVER_ERROR;
    let message = 'Internal server error';

    switch (exception.code) {
      case 'P2002': {
        const target = Array.isArray(exception.meta?.target)
          ? exception.meta?.target.join(', ')
          : exception.meta?.target;

        const readableField =
          typeof target === 'string'
            ? target.replace('Account_', '').replace('_key', '')
            : target;

        status = HttpStatus.CONFLICT;
        message = `A user with this ${readableField} already exists.`;
        break;
      }

      case 'P2025': {
        status = HttpStatus.NOT_FOUND;
        message = 'The requested record was not found.';
        break;
      }
    }

    console.error('[Prisma Error]', exception);

    response.status(status).json({
      statusCode: status,
      message,
      errorCode: exception.code,
    });
  }
}
