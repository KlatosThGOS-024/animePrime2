"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ApiResponse = void 0;
class ApiResponse {
    constructor(success, message, data) {
        this.success = success;
        this.message = message;
        this.data = data;
    }
    static success(message, data) {
        return new ApiResponse(true, message, data);
    }
    static failure(message, data) {
        return new ApiResponse(false, message, data);
    }
}
exports.ApiResponse = ApiResponse;
