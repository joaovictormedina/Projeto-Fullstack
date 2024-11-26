import { ExceptionFilter, Catch, ArgumentsHost } from '@nestjs/common';
import { Response } from 'express';

@Catch()
export class HttpExceptionFilter implements ExceptionFilter {
  catch(exception: any, host: ArgumentsHost) {
    const response = host.switchToHttp().getResponse<Response>();
    const status = exception.getStatus();

    // Supondo que o status esteja vindo como string e precisa ser convertido para número:
    const statusCode = parseInt(status, 10); // Correção para conversão numérica

    response.status(statusCode).json({
      statusCode,
      message: exception.message,
    });
  }
}
