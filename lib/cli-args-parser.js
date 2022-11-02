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
exports.parseCliArgs = exports.parseInteractiveCliArgs = void 0;
const yargs_1 = __importDefault(require("yargs"));
const inquirer_1 = __importDefault(require("inquirer"));
const logger_1 = __importDefault(require("./logger"));
const config_1 = require("./config");
function parseInteractiveCliArgs() {
    return __awaiter(this, void 0, void 0, function* () {
        const args = {};
        const argv = (0, yargs_1.default)(process.argv.splice(2))
            .command(':', 'Start the proxy server')
            .parse();
        logger_1.default.info(config_1.configs.console.color.cyan, ` ${config_1.configs.console.emojis.world} Welcome to ${config_1.configs.commandLineInterface} ${config_1.configs.console.emojis.monitor}  ${config_1.configs.console.emojis.smileyNerd}`);
        const configurationQuestions = [
            {
                name: 'configuration',
                type: 'list',
                message: 'How do you want to start gateway ?',
                choices: ['custom configuration', 'default configuration'],
                filter(val) {
                    return val.toLowerCase();
                },
            },
        ];
        const configurationAnswers = yield inquirer_1.default.prompt(configurationQuestions);
        if (configurationAnswers['configuration'] === 'Default configuration'.toLowerCase()) {
            args.filePath = null;
            return args;
        }
        else {
            const questions = [
                {
                    name: 'filePath',
                    type: 'input',
                    message: 'Please provide a valid gateway-config file path ?'
                },
            ];
            const answers = yield inquirer_1.default.prompt(questions);
            args.filePath = answers.filePath;
            return args;
        }
    });
}
exports.parseInteractiveCliArgs = parseInteractiveCliArgs;
function parseCliArgs() {
    var _a;
    const argv = (0, yargs_1.default)(process.argv.splice(2))
        .command('--file [filepath]', 'Start the proxy server')
        .option('file', {
        alias: 'f',
        type: 'string',
        description: 'Gateway configuration file path [ gateway-config.yaml | gateway-config.json ]'
    })
        .parse();
    const args = {};
    if ((argv.f || argv.file)) {
        args.filePath = (_a = argv.file) !== null && _a !== void 0 ? _a : argv.f;
    }
    return args;
}
exports.parseCliArgs = parseCliArgs;
//# sourceMappingURL=cli-args-parser.js.map