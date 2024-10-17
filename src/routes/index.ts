// combines the individual route modules so that they can be applied in a single step
import { Express } from "express";
import { createCatalogRoutes } from "./catalog";
import { createCartMiddleware, createCartRoutes } from "./cart"

export const createRoutes = (app: Express) => {
    createCartMiddleware(app);
    createCatalogRoutes(app);
    createCartRoutes(app);
}