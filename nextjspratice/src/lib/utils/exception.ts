// lib/exceptions.ts

export class HttpException extends Error {
    statusCode: number;
    constructor(message: string, statusCode: number = 500) {
      super(message);
      this.statusCode = statusCode;
      this.name = this.constructor.name;
      Error.captureStackTrace(this, this.constructor);
    }
  }
  
  export class NotFoundException extends HttpException {
    constructor(message = "Resource not found") {
      super(message, 404);
    }
  }
  
  export class BadRequestException extends HttpException {
    constructor(message = "Bad request") {
      super(message, 400);
    }
  }
  
  export class UnauthorizedException extends HttpException {
    constructor(message = "Unauthorized") {
      super(message, 401);
    }
  }
  
  export class ForbiddenException extends HttpException {
    constructor(message = "Forbidden") {
      super(message, 403);
    }
  }
  