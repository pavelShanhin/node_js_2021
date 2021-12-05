export class ErrorApi {
    public code;
    public message: string;
    public requestMethod?: string;
    public requestData?: string;

    constructor(code:number, message: string, requestMethod?:string, requestData?:string ) {
      this.code = code;
      this.message = message;
      this.requestMethod = requestMethod;
      this.requestData = requestData;
    }

    static badRequest(msg: string, requestMethod: string, requestData: string ) {
        console.log('bad request', requestData, requestMethod)
        new ErrorApi(400, msg, requestMethod, requestData)
    }

    static internalError(msg: string) {
        new ErrorApi(500, msg)
    }
}