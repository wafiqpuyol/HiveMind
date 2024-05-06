import { StatusCodes } from 'http-status-codes';

interface ErrorBody {
  message: string;
  statusCode: number;
  status: string;
  errorOrigin: string;
}

abstract class CustomError extends Error {
  abstract readonly statusCode: number;
  abstract readonly status: string;
  errorOrigin: string;

  constructor(message: string, errorOrigin: string) {
    super(message);
    this.errorOrigin = errorOrigin;
  }

  customError(): ErrorBody {
    return {
      errorOrigin: this.errorOrigin,
      message: this.message,
      status: this.status,
      statusCode: this.statusCode,
    };
  }
}

export class BadRequestException extends CustomError {
  readonly status: string = 'BadRequest';
  readonly statusCode: number = StatusCodes.BAD_REQUEST;

  constructor(message: string, errorOrigin: string) {
    super(message, errorOrigin);
  }
}

export class UnauthorizedException extends CustomError {
  readonly status: string = 'Unauthorized';
  readonly statusCode: number = StatusCodes.UNAUTHORIZED;

  constructor(message: string, errorOrigin: string) {
    super(message, errorOrigin);
  }
}

export class NotFoundException extends CustomError {
  readonly status: string = 'NotFound';
  readonly statusCode: number = StatusCodes.NOT_FOUND;

  constructor(message: string, errorOrigin: string) {
    super(message, errorOrigin);
  }
}

export class ForbiddenException extends CustomError {
  readonly status: string = 'Forbidden';
  readonly statusCode: number = StatusCodes.FORBIDDEN;

  constructor(message: string, errorOrigin: string) {
    super(message, errorOrigin);
  }
}

export class FileTooLargeException extends CustomError {
  readonly status: string = 'RequestTimeOut';
  readonly statusCode: number = StatusCodes.REQUEST_TIMEOUT;

  constructor(message: string, errorOrigin: string) {
    super(message, errorOrigin);
  }
}

export class ConflictException extends CustomError {
  readonly status: string = 'RequestConflict';
  readonly statusCode: number = StatusCodes.CONFLICT;

  constructor(message: string, errorOrigin: string) {
    super(message, errorOrigin);
  }
}

export class InternalServerErrorException extends CustomError {
  readonly status: string = 'InternalServer';
  readonly statusCode: number = StatusCodes.INTERNAL_SERVER_ERROR;

  constructor(message: string, errorOrigin: string) {
    super(message, errorOrigin);
  }
}
