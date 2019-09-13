import express from "express";
import * as entranceController from "../controllers/entrance.controller.mjs";
import * as settingsController from "../controllers/settings.controller.mjs";
export const rootRouter = express.Router();
export const apiRouter = express.Router();

rootRouter.get("/", entranceController.getEntrancesView);
rootRouter.get("/settings", settingsController.getSettingsView);

apiRouter.get("/entrances", entranceController.getEntrances);
apiRouter.get("/settings", settingsController.getSettings);

apiRouter.post("/settings", settingsController.saveSettings);
apiRouter.delete("/settings/:id", settingsController.deleteSettings);

export default rootRouter;
