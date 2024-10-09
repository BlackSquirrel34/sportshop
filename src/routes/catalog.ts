// contains the routes that present a catalog of products to the user
import { Express } from "express";
export const createCatalogRoutes = (app: Express) => {
    app.get("/", (req, resp) => {
        resp.send("Hello, SportsStore Route");
    })
}