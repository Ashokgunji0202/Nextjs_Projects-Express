import { ErrorCodes, HttpException } from "./root";

export class UnauthorizedException extends HttpException {
    constructor(message: string, errorCode: ErrorCodes = ErrorCodes.UNAUTHORIZED, error: any = []) {
        super(message, errorCode, 401, error);
        
    }
}