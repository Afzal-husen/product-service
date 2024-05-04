import { CustomError } from "./custom-error.js";

interface ParamTypes {
  code?: number;
  message?: string;
}

export class RequestError extends CustomError {
  statusCode!: number;
  private static readonly _statusCode = 400;
  constructor(params?: ParamTypes) {
    super(params?.message || "Bad Request");

    this.statusCode = params?.code || RequestError._statusCode;

    // Only because we are extending a built in class
    Object.setPrototypeOf(this, RequestError.prototype);
  }
}
