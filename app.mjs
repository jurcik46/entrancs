import express from "express";
import helmet from "helmet";
import cors from "cors";
import cookieParser from "cookie-parser";
import session from "express-session";
import loggerMorgan from "morgan";
import logger from "./helpers/logger.helper.mjs";
import { rootRouter, apiRouter } from "./routes/root.router.mjs";
import rateLimiterMiddleware from "./middlewares/requestRateLimiter.middleware.mjs";
import { corsOption } from "./configs/security.config.mjs";
import { LOG_OUTPUT } from "./configs/logger.config.mjs";
import { dbAuthenticate, dbSqlite } from "./helpers/db.helper.mjs";
// import sassMiddleware from "node-sass-middleware";
import flash from "connect-flash";
import errorHandlerDev from "errorhandler";

import {
  errorRenderHandler,
  notFoundRenderHandler
} from "./middlewares/errorHandler.middleware.mjs";
import {
  sessionOptions,
  // sassMiddlewareOptions,
  staticFolderPath,
  APP_ROUTE_PREFIX
} from "./configs/app.config.mjs";

const app = express();
//* View Enginte setup **/
app.set("view engine", "ejs");
app.set("views", "views");

//** Security helmet */
app.use(helmet());
//** CORS security */
app.use(cors(corsOption));
//** Rate Limiter for request  */
app.use(rateLimiterMiddleware);

//** Logger */
app.use(loggerMorgan(LOG_OUTPUT, { stream: logger.stream }));

//** JSON Body Parser */
app.use(express.json());

//** URL payloud Parser */
app.use(
  express.urlencoded({
    extended: true
  })
);

//** Cookie Parser */
app.use(cookieParser());
//** Session */
app.use(session(sessionOptions));
//* Flash messages */
app.use(flash());
// app.use(sassMiddleware(sassMiddlewareOptions));
//** Static folder  */
app.use(express.static(staticFolderPath));
// app.get("/", (req, res, next) => {
//   res.json("asdasa");
// })
//** Root router implementation */
app.use(rootRouter);
app.use(APP_ROUTE_PREFIX, apiRouter);

//** Error handler middlewares  */
app.use(notFoundRenderHandler);
if (process.env.APP_MODE === "development") {
  app.use(errorHandlerDev());
}
app.use(errorRenderHandler);

dbAuthenticate(dbSqlite); // TODO delete this testing coonection to DB

export default app;
