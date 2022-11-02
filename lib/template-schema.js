"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.templateSchema = void 0;
const joi_1 = __importDefault(require("joi"));
exports.templateSchema = joi_1.default.object({
    http: joi_1.default.object().keys({
        port: joi_1.default.number()
            .integer().required()
    }),
    serviceEndpoints: joi_1.default.object().pattern(joi_1.default.string(), joi_1.default.object({
        path: joi_1.default.string().required(),
        protocol: joi_1.default.string().required(),
        host: joi_1.default.string().required(),
        changeOrigin: joi_1.default.bool().required(),
        port: joi_1.default.number()
    })).required(),
    policies: joi_1.default.array().required(),
});
//# sourceMappingURL=template-schema.js.map