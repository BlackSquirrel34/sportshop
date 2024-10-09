import { createServer } from "http";
import express, { Express } from "express";
import helmet from "helmet";
import { getConfig } from "./config";
import { createRoutes } from "./routes";
// get port from config, with 5000 as fallback
const port = getConfig("http:port", 5000);
const expressApp: Express = express();

expressApp.use(helmet());
expressApp.use(express.json());
expressApp.use(express.urlencoded({extended: true}))
// expressApp.get("/", (req, resp) => {
//     resp.send("Hello, SportsStore");
// })
createRoutes(expressApp);
const server = createServer(expressApp);

server.listen(port,
    () => console.log(`HTTP Server listening on port ${port}`));

