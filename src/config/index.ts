import { readFileSync } from "fs";
import { getEnvironment, Env } from "./environment";
import { merge } from "./merge";
import { config as dotenvconfig } from "dotenv";

// uses an environment variable named SERVER_CONFIG to get the name of the configuration file, 
// falling back to server.config.json if the variable isn’t defined.
const file = process.env.SERVER_CONFIG ?? "server.config.json"
const data = JSON.parse(readFileSync(file).toString());
// setup to read environment variables
dotenvconfig({
    path: getEnvironment().toString() + ".env"
})

// The contents of the file are read and merged with an environment-specific file, 
// the name of which is determined by appending the current environment, such as production.server.config.json.
try {
    const envFile = getEnvironment().toString() + "." + file;
    const envData = JSON.parse(readFileSync(envFile).toString());
    merge(data, envData);
} catch {
    // do nothing - file doesn't exist or isn't readable
}

// accepts a string in the form http:port, where keys are separated by colons (the : character). 
// The keys are used to navigate through the configuration data to find a value. 
// A default value can be provided, which is returned if a value has not been loaded from the configuration files. 
export const getConfig = (path: string, defaultVal: any = undefined) : any => {
    const paths = path.split(":");
    let val = data;
    paths.forEach(p => val = val[p]);
    return val ?? defaultVal;
}
export const getSecret = (name: string) => {
    const secret = process.env[name];
    if (secret === undefined) {
        throw new Error(`Undefined secret: ${name}`);
    }
    return secret;
}
export { getEnvironment, Env };
