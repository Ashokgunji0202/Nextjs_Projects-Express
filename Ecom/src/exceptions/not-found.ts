import { HttpException, ErrorCodes } from "./root";

export class NotFoundException extends HttpException {
  constructor(message: string, errorCode: ErrorCodes = ErrorCodes.NOT_FOUND, error: any = []) {
    super(message, errorCode, 404, error);
  }
}
