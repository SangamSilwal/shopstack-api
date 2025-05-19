//message, status code, error codes,error

export class HttpException extends Error {
    message: string;
    errorCode: ErrorCodes;
    statusCode: number;
    errors: any;

    constructor(message:string,errorCode:ErrorCodes,statusCode:number,error:any)
    {
        super(message)
        this.message = message
        this.errorCode = errorCode
        this.statusCode = statusCode
        this.errors = error
    }
}

export enum ErrorCodes {
    USER_NOT_FOUND = 1001,
    USER_ALREADY_EXISTS = 1002,
    INCORRECT_PASSWORD = 1003,
    UNPROCESSABLE_ENTITY = 2001,
    INTERNAL_ERROR_CODE = 3001,
    UNAUTHORIZED_ERROR_CODE = 4001
}