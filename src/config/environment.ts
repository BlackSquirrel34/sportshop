export enum Env {
    Development = "development", Production = "production"
}
export const getEnvironment = () : Env => {
    const env = process.env.NODE_ENV;
    return  env === undefined || env === Env.Development
        ? Env.Development : Env.Production;
}

// If the NODE_ENV variable isn’t set or has been set to development, then 
// the application is in the development environment. 