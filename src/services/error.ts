export class ErrorApi {
    public code;
    public message: string;

    constructor(code:number, message: string) {
      this.code = code;
      this.message = message;
    }

    static badRequest(msg: string) {
        new ErrorApi(400, msg)
    }

    static internalError(msg: string) {
        new ErrorApi(500, msg)
    }
}