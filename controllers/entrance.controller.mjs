import EntrancesModel from "../database/models/entrances.model.mjs";
import { APP_HOST, APP_PORT } from "../configs/app.config.mjs";
export const getEntrances = async (req, res, next) => {
  try {
    const {
      limit,
      offset,
      sort,
      order,
      nfcId,
      name,
      allowed,
      startDate,
      endDate
    } = req.query;
    const allEntrances = await EntrancesModel.getAllEntrances(
      limit,
      offset,
      sort,
      order,
      allowed,
      startDate,
      endDate,
      nfcId,
      name
    );
    const count = await EntrancesModel.getAllEntrancesCount(
      allowed,
      startDate,
      endDate,
      nfcId,
      name
    );
    res.json({ total: count, result: allEntrances });
  } catch (error) {
    throw new Error(error);
  }
};

export const getEntrancesView = async (req, res, next) => {
  try {
    res.render("index", {
      host: APP_HOST,
      port: APP_PORT,
      path: "/",
      hasError: false,
      errorMessage: null,
      validationErrors: []
    });
  } catch (error) {
    res.redirect("/500");
    throw new Error(error);
  }
};
