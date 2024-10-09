// contains the routes that present a catalog of products to the user
import { Express } from "express";
import { catalog_repository } from "../data";

export const createCatalogRoutes = (app: Express) => {
      // pagination details are read from the query string and included in the call to 
      // the repository. If the query string doesn’t include pagination information, 
      // then defaults are used to select page 1 with four items per page.
   app.get("/", async (req, resp) => {
        const page = Number.parseInt(req.query.page?.toString() ?? "1");
        const pageSize =Number.parseInt(req.query.pageSize?.toString() ?? "3");
        const res = await catalog_repository.getProducts({ page, pageSize});
        resp.render("index", { ...res, page, pageSize,
            pageCount: Math.ceil(res.totalCount / (pageSize ?? 1))});
    });
     
}