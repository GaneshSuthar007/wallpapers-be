import { HttpStatus } from '@nestjs/common';
import { Response } from 'express';

export function success(response: Response, data: any, message: string) {
  const status = HttpStatus.OK;
  response.status(status).json({
    status,
    ...(data ? { data } : {}),
    message,
  });
}
export function error(response: Response, data: any, message: string) {
  const status = HttpStatus.BAD_REQUEST;
  response.status(status).json({
    status,
    ...(data ? { data } : {}),
    message,
  });
}
