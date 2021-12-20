import {

    StatusCodes,

} from 'http-status-codes';

export class ErrorApi {
    public code;
    public message: string;
    public requestMethod?: string;
    public requestData?: string;

    constructor(code:number, message: string, requestMethod?:string, requestData?:string) {
        this.code = code;
        this.message = message;
        this.requestMethod = requestMethod;
        this.requestData = requestData;
    }

    static badRequest(msg: string, requestMethod: string, requestData: string) {
        return new ErrorApi(StatusCodes.BAD_REQUEST, msg, requestMethod, requestData);
    }

    static internalError(msg: string) {
        return new ErrorApi(StatusCodes.INTERNAL_SERVER_ERROR, msg);
    }

    static unAuthorizedError(msg: string) {
        return new ErrorApi(StatusCodes.UNAUTHORIZED, msg);
    }

    static forbiddenError(msg: string) {
        return new ErrorApi(StatusCodes.FORBIDDEN, msg);
    }
}
