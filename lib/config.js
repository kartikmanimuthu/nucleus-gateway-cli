"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.configs = void 0;
const configuration = {
    commandLineInterface: 'nucleus-gateway-cli',
    defualtTemplateArtifact: ['../', 'templates', 'gateway-config.yaml'],
    supportedFileExtension: ['.json', '.yaml'],
    supportedFileName: ['gateway-config'],
    console: {
        color: {
            cyan: '\x1b[36m%s\x1b[0m',
            green: "\x1b[32m%s\x1b[0m",
            red: "\x1b[31m%s\x1b[0m",
            yellow: '\x1b[33m%s\x1b[0m',
        },
        emojis: {
            plug: String.fromCodePoint(0x1F50C),
            laptop: String.fromCodePoint(0x1F4BB),
            world: String.fromCodePoint(0x1F30E),
            smileyNerd: String.fromCodePoint(0x1F60E),
            siren: String.fromCodePoint(0x1F6A8),
            monitor: String.fromCodePoint(0x1F5A5),
            rocket: String.fromCodePoint(0x1F680),
        }
    },
    literals: {
        loadingTemplateNotFound: 'Please provide gateway-config file!',
        loadingDefaultTemplate: 'gateway-config file not found fallback to default-gateway-config.yaml',
        valideFileName: 'Error : please provide a valid file name! supported filenames :',
        validFileType: 'Error : please provide a valid supported file type! supported filetypes :',
        templateParsingError: 'Error in parsing gateway-config file : ',
    },
};
exports.configs = configuration;
//# sourceMappingURL=config.js.map