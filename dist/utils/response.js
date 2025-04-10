"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.errorResponse = exports.successResponse = exports.createdResponse = void 0;
const createdResponse = (message, data = null) => {
    return (0, exports.successResponse)(message, data);
};
exports.createdResponse = createdResponse;
const successResponse = (message, data = null) => {
    const response = {
        status: true,
        message
    };
    if (data) {
        response.data = data;
    }
    return response;
};
exports.successResponse = successResponse;
const errorResponse = (message, data = null) => {
    return {
        status: false,
        message,
    };
};
exports.errorResponse = errorResponse;
