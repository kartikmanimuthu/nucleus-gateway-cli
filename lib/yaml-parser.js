"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.parseYamlToObject = void 0;
const js_yaml_1 = __importDefault(require("js-yaml"));
function parseYamlToObject(content) {
    try {
        const doc = js_yaml_1.default.load(content);
        return doc;
    }
    catch (e) {
        throw new Error(`encountered error during parsing yaml file : ${e.message}`);
    }
}
exports.parseYamlToObject = parseYamlToObject;
//# sourceMappingURL=yaml-parser.js.map