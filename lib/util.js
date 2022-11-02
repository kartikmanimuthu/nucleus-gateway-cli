"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.camelize = exports.validateWith = exports.readFileIfExist = void 0;
const fs_extra_1 = require("fs-extra");
const lodash_1 = require("lodash");
function readFileIfExist(artifactPath, encoding = 'utf-8') {
    return __awaiter(this, void 0, void 0, function* () {
        let fileExist = yield (0, fs_extra_1.pathExists)(artifactPath);
        if (!fileExist) {
            throw new Error(`filepath : ${artifactPath} does not exist !`);
        }
        let content;
        try {
            content = yield (0, fs_extra_1.readFile)(artifactPath, { encoding: encoding });
        }
        catch (error) {
            throw new Error(`encountered error during read operation : ${error.message}`);
        }
        return content;
    });
}
exports.readFileIfExist = readFileIfExist;
function validateWith(Lookups) {
    return (toLookup) => Lookups.indexOf(toLookup) !== -1;
}
exports.validateWith = validateWith;
const camelize = (obj) => (0, lodash_1.transform)(obj, (acc, value, key, target) => {
    const camelKey = (0, lodash_1.isArray)(target) ? key : (0, lodash_1.camelCase)(key);
    acc[camelKey] = (0, lodash_1.isObject)(value) ? (0, exports.camelize)(value) : value;
});
exports.camelize = camelize;
//# sourceMappingURL=util.js.map