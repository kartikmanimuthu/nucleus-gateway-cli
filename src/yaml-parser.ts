
import yaml from 'js-yaml';


export function parseYamlToObject<T = unknown>(content: string): T {
    try {
        const doc = yaml.load(content);
        return doc as T;
    } catch (e) {
        throw new Error(`encountered error during parsing yaml file : ${(e as Error).message}`);
    }
}