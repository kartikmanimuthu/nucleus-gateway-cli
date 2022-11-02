import { extname, basename } from 'path';

import { camelize, readFileIfExist, validateWith } from './util';
import { parseYamlToObject } from './yaml-parser';
import { parseCliArgs } from './cli-args-parser';
import logger from './logger';
import { bootstrapProxyServer } from './reverse-proxy-server';
import { templateSchema } from './template-schema';
import { configs } from './config';


export function main() {
    const { literals, supportedFileExtension, supportedFileName, defualtTemplateArtifact, console } = configs;

    const args = parseCliArgs();
    if (!args?.filePath) {
        // @commented the default template logic for now.
        // args.filePath = join(__dirname, ...defualtTemplateArtifact);
        return logger.error(console.color.red, `${configs.console.emojis.siren} ${literals.loadingTemplateNotFound}`);
    }

    const isValidFileName = validateWith([...supportedFileName])(basename(args?.filePath)?.split('.')[0]);
    if (!isValidFileName) return logger.error(console.color.red, literals.valideFileName, supportedFileName);

    const isValidExtension = validateWith([...supportedFileExtension])(extname(args.filePath));
    if (!isValidExtension) return logger.error(console.color.red, literals.validFileType, supportedFileExtension);


    readFileIfExist(args.filePath)
        .then(content => parseYamlToObject<IReverseProxyMapper>(content))
        .then(async configuration => {
            const configs = camelize(configuration);
            const { error } = templateSchema.validate(configs);
            if (error && error?.message) {
                return logger.error(console.color.red, literals.templateParsingError, error?.message);
            }
            const [registerProxy, startServer] = bootstrapProxyServer(configs);
            registerProxy();
            startServer();
        })
        .catch(err => logger.error(console.color.red, err.message))


}
