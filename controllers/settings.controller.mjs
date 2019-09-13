import AllowedCardModel from "../database/models/allowedCard.model.mjs";
import { APP_HOST, APP_PORT } from "../configs/app.config.mjs";

export const getSettings = async (req, res, next) => {
  try {
    const { limit, offset, sort, order, nfcId, name } = req.query;
    const allowedCards = await AllowedCardModel.getAllowedCards(
      limit,
      offset,
      sort,
      order,
      nfcId,
      name
    );
    const count = await AllowedCardModel.getAllowedCardsCount(nfcId, name);
    res.json({ total: count, result: allowedCards });
  } catch (error) {
    console.log("error: ", error);
  }
};

export const getSettingsView = async (req, res, next) => {
  try {
    res.render("settings/settings", {
      host: APP_HOST,
      port: APP_PORT,
      path: "/settings",
      hasError: false,
      errorMessage: null,
      validationErrors: []
    });
  } catch (error) {
    res.redirect("/500");
    console.log("error: ", error);
  }
};

export const saveSettings = async (req, res, next) => {
  try {
    if (req.body.id) {
      const { id, nfcId, name, description } = req.body;
      const updatedCard = await AllowedCardModel.updateAllowedCard(
        id,
        nfcId,
        name,
        description
      );
      res.json(updatedCard);
    } else {
      const { nfcId, name, description } = req.body;
      const newCard = await AllowedCardModel.addAllowedCards(
        nfcId,
        name,
        description
      );
      res.json(newCard);
    }
  } catch (error) {
    res.json({});
    console.log("error: ", error);
  }
};

export const deleteSettings = async (req, res, next) => {
  try {
    const { id } = req.params;
    const dCard = await AllowedCardModel.deleteAllowedCard(id);
    res.json(dCard);
  } catch (error) {
    res.json({});
    console.log("error: ", error);
  }
};
