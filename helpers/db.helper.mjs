import Sequelize from "sequelize";

import {
  dbName,
  dbuser,
  dbPassword,
  sequelizeOptions,
  sequelizeSqLiteOptions
} from "../configs/database.config.mjs";

import log from "./logger.helper.mjs";

const dbLog = { label: "DATABASE" };

export const db = new Sequelize(dbName, dbuser, dbPassword, {
  ...sequelizeOptions,
  logging: msg => {
    log.debug({ ...dbLog, message: msg });
  }
});

export const dbSqlite = new Sequelize({
  ...sequelizeSqLiteOptions,
  logging: msg => {
    log.debug({ ...dbLog, message: msg });
  }
});

export const dbAuthenticate = async db => {
  try {
    await db.authenticate();
    log.info({
      ...dbLog,
      message: "Connection has been established successfully"
    });
  } catch (error) {
    log.error({
      ...dbLog,
      message: "Unable to connect to the database",
      error
    });
  }
};

export const modelBasicSetup = {
  createdAt: "created",
  updatedAt: "updated"
};
