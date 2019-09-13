import Sequelize from "sequelize";
import { dbSqlite, modelBasicSetup } from "../../helpers/db.helper.mjs";
const { Model, STRING, INTEGER, Op } = Sequelize;
class AllowedCard extends Model {}

AllowedCard.init(
  {
    id: {
      field: "id",
      type: INTEGER,
      autoIncrement: true,
      primaryKey: true
    },
    nfcId: {
      field: "nfc_Id",
      type: STRING,
      allowNull: false
    },
    name: {
      field: "name",
      type: STRING,
      allowNull: false
    },
    description: {
      field: "description",
      type: STRING,
      allowNull: true,
      defaultValue: null
    }
  },
  {
    ...modelBasicSetup,
    sequelize: dbSqlite,
    tableName: "allowed_cards"
  }
);

AllowedCard.getAllowedCards = (limit, offset, sort, order, nfcId, name) => {
  return AllowedCard.findAll({
    where: {
      nfcId: {
        [Op.or]: {
          [Op.like]: `%${nfcId ? nfcId : ""}%`,
          [Op.is]: null
        }
      },
      name: {
        [Op.or]: {
          [Op.like]: `%${name ? name : ""}%`,
          [Op.is]: null
        }
      }
    },
    order: [[sort ? sort : "nfcId", order ? order : "DESC"]],
    limit: limit,
    offset: offset
  });
};

AllowedCard.getAllowedCardsCount = (nfcId, name) => {
  return AllowedCard.count({
    where: {
      nfcId: {
        [Op.or]: {
          [Op.like]: `%${nfcId ? nfcId : ""}%`,
          [Op.is]: null
        }
      },
      name: {
        [Op.or]: {
          [Op.like]: `%${name ? name : ""}%`,
          [Op.is]: null
        }
      }
    }
  });
};

AllowedCard.addAllowedCards = (nfcId, name, description) => {
  return AllowedCard.create(
    { nfcId, name, description },
    { fields: ["nfcId", "name", "description"] }
  );
};

AllowedCard.updateAllowedCard = async (id, nfcId, name, description) => {
  let card = await AllowedCard.findByPk(id);
  // Check if record exists in db
  if (card) {
    card = await card.update({
      nfcId,
      name,
      description
    });
  }
  return card;
};

AllowedCard.deleteAllowedCard = async id => {
  let card = await AllowedCard.findByPk(id);
  // Check if record exists in db
  if (card) {
    card = await card.destroy({ force: true });
  }
  return card;
};

export default AllowedCard;
