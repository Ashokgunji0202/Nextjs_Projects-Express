//message ,status,error codes
export class HttpException extends Error {
    message: string;
    errorCode: any;
    statusCode: number;
    errors:ErrorCodes
    constructor(message: string, errorCode: ErrorCodes, statusCode: number,error:any) {
        super(message);
        this.message = message;
        this.errorCode=errorCode;
        this.statusCode = statusCode;
        this.errors=error
        
    }
}

export enum ErrorCodes {
    USER_NOT_FOUND = 1001,
    USER_ALREADY_EXISTS = 1002,
    INCORRECT_PASSWORD = 1003,
    UNPROCESSABLE_ENTITY = 422,
    ADDRESS_NOT_FOUND = 1004,
    ADDRESS_DOES_NOT_BELONG=1005,
    ORDER_NOT_FOUND = 1006,
    BAD_REQUEST = 400,
    UNAUTHORIZED = 401,
    FORBIDDEN = 403,
    NOT_FOUND = 404,
    SERVER_ERROR = 500,
    BAD_GATEWAY = 502,
    SERVICE_UNAVAILABLE = 503,
    GATEWAY_TIMEOUT = 504,
  }