import { HttpException, ErrorCodes } from "./root";

export class BadRequestsException extends HttpException {
  constructor(message: string, errorCode: ErrorCodes = ErrorCodes.BAD_REQUEST, error: any = []) {
    super(message, errorCode, 400, error);
  }
}
