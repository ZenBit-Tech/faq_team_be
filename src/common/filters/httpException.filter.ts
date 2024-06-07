import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  HttpException,
} from '@nestjs/common';
import { Request, Response } from 'express';

@Catch(HttpException)
export class HttpExceptionFilter implements ExceptionFilter {
  catch(exception: HttpException, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const request = ctx.getRequest<Request>();
    const status = exception.getStatus();

    const responseBody = {
      statusCode: status,
      timestamp: new Date().toISOString(),
      path: request.url,
      message: exception.message,
      cause: {},
    };

    const exceptionResponse = exception.getResponse();
    if (typeof exceptionResponse === 'object' && 'cause' in exceptionResponse) {
      responseBody.cause = exceptionResponse['cause'];
    }

    response.status(status).json(responseBody);
  }
}
