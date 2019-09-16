import { default as path } from "path";
import appRoot from "app-root-path";

export const staticFolderPath = path.join(appRoot.path, "public");
export const APP_ROUTE_PREFIX = process.env.APP_ROUTE_PREFIX;
export const APP_HOST = process.env.APP_HOST;
export const APP_PORT = process.env.APP_PORT;

export const CSS_FOLDER_PATH = path.join(staticFolderPath, "css");
export const SCSS_FOLDER_PATH = path.join(appRoot.path, "view/scss");
export const sassMiddlewareOptions = {
  src: CSS_FOLDER_PATH,
  dest: SCSS_FOLDER_PATH,
  indentedSyntax: false, // true = .sass and false = .scss
  sourceMap: true
};

export const sessionOptions = {
  secret: "my secret",
  resave: false,
  saveUninitialized: false
}; // TODO load from  env
