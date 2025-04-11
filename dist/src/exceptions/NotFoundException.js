"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.NotFoundException = void 0;
class NotFoundException extends Error {
    constructor(message, status) {
        super(message);
        this.status = status !== null && status !== void 0 ? status : 404;
        this.message = message;
        Error.captureStackTrace(this, this.constructor);
    }
}
exports.NotFoundException = NotFoundException;
