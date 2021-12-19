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
        return new ErrorApi(400, msg, requestMethod, requestData);
    }

    static internalError(msg: string) {
        return new ErrorApi(500, msg);
    }

    static unAuthorizedError(msg: string) {
        return new ErrorApi(401, msg);
    }

    static forbiddenError(msg: string) {
        return new ErrorApi(403, msg);
    }
}
