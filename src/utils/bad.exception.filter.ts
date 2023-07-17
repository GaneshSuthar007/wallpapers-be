import {
  ExceptionFilter,
  Catch,
  ArgumentsHost,
  BadRequestException,
  Logger,
} from '@nestjs/common';
import { Request, Response } from 'express';
import { error } from './response';

@Catch(BadRequestException)
export class BadExceptionFilter implements ExceptionFilter {
  private readonly logger = new Logger(BadExceptionFilter.name);

  catch(exception: BadRequestException, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const request = ctx.getRequest<Request>();
    const status = exception.getStatus();
    this.logger.error({
      exception: exception.message,
      statusCode: status,
      timestamp: new Date().toISOString(),
      path: request.url,
    });
    return error(response, null, exception.message);
  }
}
