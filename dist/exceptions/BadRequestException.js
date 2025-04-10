"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BadRequestException = void 0;
class BadRequestException extends Error {
    constructor(message, status) {
        super(message);
        this.status = status !== null && status !== void 0 ? status : 400;
        this.message = message;
        Error.captureStackTrace(this, this.constructor);
    }
}
exports.BadRequestException = BadRequestException;
