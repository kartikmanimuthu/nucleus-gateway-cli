import yargs from 'yargs';
import inquirer from 'inquirer';
import logger from './logger';
import { configs } from './config';


export async function parseInteractiveCliArgs() {
    const args: {
        filePath?: string,
        log?: boolean
    } = {};


    const argv = yargs(process.argv.splice(2))
        .command(':', 'Start the proxy server')
        .parse() as any


    logger.info(configs.console.color.cyan, ` ${configs.console.emojis.world} Welcome to ${configs.commandLineInterface} ${configs.console.emojis.monitor}  ${configs.console.emojis.smileyNerd}`);
    const configurationQuestions = [
        {
            name: 'configuration',
            type: 'list',
            message: 'How do you want to start gateway ?',
            choices: ['custom configuration', 'default configuration'],
            filter(val: string) {
                return val.toLowerCase();
            },
        },
    ];
    const configurationAnswers = await inquirer.prompt(configurationQuestions);

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

        const answers = await inquirer.prompt(questions);
        args.filePath = answers.filePath;
        return args;
    }

}



export function parseCliArgs() {

    const argv = yargs(process.argv.splice(2))
        .command('--file [filepath]', 'Start the proxy server')
        .option('file', {
            alias: 'f',
            type: 'string',
            description: 'Gateway configuration file path [ gateway-config.yaml | gateway-config.json ]'
        })
        .parse() as any
    const args: {
        filePath?: string,
        log?: boolean
    } = {};


    if ((argv.f || argv.file)) {
        args.filePath = argv.file ?? argv.f;
    }
    return args;
}


