import { pathExists, readFile } from 'fs-extra';
import { transform, isArray, isObject, camelCase } from 'lodash';


export async function readFileIfExist(artifactPath: string, encoding: string = 'utf-8') {
    let fileExist = await pathExists(artifactPath);
    if (!fileExist) {
        throw new Error(`filepath : ${artifactPath} does not exist !`);
    }

    let content: string;
    try {
        content = await readFile(artifactPath, { encoding: encoding });
    } catch (error) {
        throw new Error(`encountered error during read operation : ${error.message}`);
    }
    return content;
}


export function validateWith(Lookups: string[]): (toLookup: string) => boolean {
    return (toLookup: string) => Lookups.indexOf(toLookup) !== -1;
}


export const camelize = (obj: { [key: string]: any }) => transform(obj, (acc: any, value, key, target) => {
    const camelKey = isArray(target) ? key : camelCase(key);
    acc[camelKey] = isObject(value) ? camelize(value) : value;
});
