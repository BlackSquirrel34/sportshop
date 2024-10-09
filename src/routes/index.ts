// combines the individual route modules so that they can be applied in a single step
import { Express } from "express";
import { createCatalogRoutes } from "./catalog";

export const createRoutes = (app: Express) => {
    createCatalogRoutes(app);
}