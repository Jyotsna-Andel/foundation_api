import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  HttpException,
  HttpStatus,
  Logger,
} from '@nestjs/common';
import { HttpAdapterHost } from '@nestjs/core';
import { Prisma } from '../../generated/prisma/client.js';

interface ResolvedError {
  statusCode: number;
  message: string | string[];
}

@Catch()
export class AllExceptionsFilter implements ExceptionFilter {
  private readonly logger = new Logger(AllExceptionsFilter.name);

  constructor(private readonly httpAdapterHost: HttpAdapterHost) {}

  catch(exception: unknown, host: ArgumentsHost) {
    const { httpAdapter } = this.httpAdapterHost;
    const ctx = host.switchToHttp();
    const { statusCode, message } = this.resolve(exception);

    if (statusCode >= 500) {
      this.logger.error(exception);
    }

    httpAdapter.reply(
      ctx.getResponse(),
      {
        statusCode,
        error: HttpStatus[statusCode] ?? 'ERROR',
        message,
        path: httpAdapter.getRequestUrl(ctx.getRequest()),
        timestamp: new Date().toISOString(),
      },
      statusCode,
    );
  }

  private resolve(exception: unknown): ResolvedError {
    if (exception instanceof HttpException) {
      const response = exception.getResponse();
      const message =
        typeof response === 'string'
          ? response
          : ((response as { message?: string | string[] }).message ??
            exception.message);
      return { statusCode: exception.getStatus(), message };
    }

    if (exception instanceof Prisma.PrismaClientKnownRequestError) {
      switch (exception.code) {
        case 'P2002':
          return {
            statusCode: HttpStatus.CONFLICT,
            message: 'A record with this value already exists',
          };
        case 'P2025':
          return { statusCode: HttpStatus.NOT_FOUND, message: 'Record not found' };
        case 'P2003':
          return {
            statusCode: HttpStatus.CONFLICT,
            message: 'Operation violates a relation to another record',
          };
      }
    }

    return {
      statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
      message: 'Internal server error',
    };
  }
}
