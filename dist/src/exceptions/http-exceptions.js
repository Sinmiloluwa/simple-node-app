"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.HttpException = void 0;
class HttpException extends Error {
    constructor(status, message) {
        super(message);
        this.status = status;
        this.message = message;
        Error.captureStackTrace(this, this.constructor);
    }
}
exports.HttpException = HttpException;
