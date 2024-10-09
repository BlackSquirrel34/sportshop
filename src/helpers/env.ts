import { Env, getEnvironment } from "../config";

// The isDevelopment helper can be used to determine whether the application 
// has been configured for development or production. 
export const isDevelopment = (value: any) => {
    return getEnvironment() === Env.Development
}