"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ApiError = void 0;
class ApiError extends Error {
    constructor(message, statusCode = 500, details) {
        super(message);
        this.statusCode = statusCode;
        this.details = details;
        Object.setPrototypeOf(this, ApiError.prototype);
    }
    static badRequest(message, details) {
        return new ApiError(message, 400, details);
    }
    static unauthorized(message, details) {
        return new ApiError(message, 401, details);
    }
    static forbidden(message, details) {
        return new ApiError(message, 403, details);
    }
    static notFound(message, details) {
        return new ApiError(message, 404, details);
    }
    static internal(message, details) {
        return new ApiError(message, 500, details);
    }
}
exports.ApiError = ApiError;
