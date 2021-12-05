import { Request, Response } from "express";

export class LoggingService {
    constructor() {}

    public static getKeyValueString = (object: any, objectName: string) => {
      const objectEntries = Object.entries(object);
    
      return objectEntries.length > 0 ? objectEntries.reduce((acc, [key, value]) => `${acc} ${key}:${value},`, `${objectName}:`) : '';
    }

    static log =(serviceFunctionName: string, argsTitle: 'body' | 'params' | 'query') => (req: Request, res: Response, next: Function) => {
      console.log(`Req method: ${req.method}; route: ${req.baseUrl}; service handler name: ${serviceFunctionName}; request params: ${this.getKeyValueString(req[argsTitle], argsTitle)}`)
    
      next();
  }
} 