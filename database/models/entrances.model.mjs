import Sequelize from "sequelize";
import { dbSqlite, modelBasicSetup } from "../../helpers/db.helper.mjs";
const { Model, STRING, INTEGER, Op } = Sequelize;
import moment from "moment";
class Entrances extends Model {}
const entranceFilter = Entrances.init(
  {
    id: {
      field: "id",
      primaryKey: true,
      type: INTEGER,
      allowNull: false
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
    },
    allowed: {
      field: "allowed",
      type: INTEGER,
      allowNull: true,
      defaultValue: null
    }
  },
  {
    ...modelBasicSetup,
    sequelize: dbSqlite,
    tableName: "entrances"
  }
);

Entrances.getAllEntrances = (
  limit,
  offset,
  sort,
  order,
  allowed,
  startDate,
  endDate,
  nfcId,
  name
) => {
  moment.locale("sk");
  return Entrances.findAll({
    where: {
      allowed: {
        [Op.or]: {
          [Op.like]: `%${allowed ? allowed : ""}%`
        }
      },
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
      },
      created: {
        [Op.between]: [
          `${startDate ? startDate : "2000-01-01 0:0:0"}`,
          `${endDate ? endDate : moment()}`
        ]
      }
    },
    order: [[sort ? sort : "nfcId", order ? order : "DESC"]],
    limit: limit,
    offset: offset
  });
};

Entrances.getAllEntrancesCount = (allowed, startDate, endDate, nfcId, name) => {
  moment.locale("sk");
  return Entrances.count({
    where: {
      allowed: {
        [Op.or]: {
          [Op.like]: `%${allowed ? allowed : ""}%`
        }
      },
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
      },
      created: {
        [Op.between]: [
          `${startDate ? startDate : "2000-01-01 0:0:0"}`,
          `${endDate ? endDate : moment()}`
        ]
      }
    }
  });
};
export default Entrances;
