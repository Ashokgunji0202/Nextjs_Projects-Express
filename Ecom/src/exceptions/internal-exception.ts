import { ErrorCodes, HttpException } from "./root";

export class InternalException extends HttpException{

    constructor(message: string,errors: any, errorCode: number) {
        super(message, errorCode,errors, ErrorCodes.SERVER_ERROR);
    }

}