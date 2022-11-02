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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.main = void 0;
const path_1 = require("path");
const util_1 = require("./util");
const yaml_parser_1 = require("./yaml-parser");
const cli_args_parser_1 = require("./cli-args-parser");
const logger_1 = __importDefault(require("./logger"));
const reverse_proxy_server_1 = require("./reverse-proxy-server");
const template_schema_1 = require("./template-schema");
const config_1 = require("./config");
function main() {
    var _a;
    const { literals, supportedFileExtension, supportedFileName, defualtTemplateArtifact, console } = config_1.configs;
    const args = (0, cli_args_parser_1.parseCliArgs)();
    if (!(args === null || args === void 0 ? void 0 : args.filePath)) {
        // @commented the default template logic for now.
        // args.filePath = join(__dirname, ...defualtTemplateArtifact);
        return logger_1.default.error(console.color.red, `${config_1.configs.console.emojis.siren} ${literals.loadingTemplateNotFound}`);
    }
    const isValidFileName = (0, util_1.validateWith)([...supportedFileName])((_a = (0, path_1.basename)(args === null || args === void 0 ? void 0 : args.filePath)) === null || _a === void 0 ? void 0 : _a.split('.')[0]);
    if (!isValidFileName)
        return logger_1.default.error(console.color.red, literals.valideFileName, supportedFileName);
    const isValidExtension = (0, util_1.validateWith)([...supportedFileExtension])((0, path_1.extname)(args.filePath));
    if (!isValidExtension)
        return logger_1.default.error(console.color.red, literals.validFileType, supportedFileExtension);
    (0, util_1.readFileIfExist)(args.filePath)
        .then(content => (0, yaml_parser_1.parseYamlToObject)(content))
        .then((configuration) => __awaiter(this, void 0, void 0, function* () {
        const configs = (0, util_1.camelize)(configuration);
        const { error } = template_schema_1.templateSchema.validate(configs);
        if (error && (error === null || error === void 0 ? void 0 : error.message)) {
            return logger_1.default.error(console.color.red, literals.templateParsingError, error === null || error === void 0 ? void 0 : error.message);
        }
        const [registerProxy, startServer] = (0, reverse_proxy_server_1.bootstrapProxyServer)(configs);
        registerProxy();
        startServer();
    }))
        .catch(err => logger_1.default.error(console.color.red, err.message));
}
exports.main = main;
//# sourceMappingURL=index.js.map