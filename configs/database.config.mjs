export const dbName = process.env.DB_NAME;
export const dbuser = process.env.DB_USER;
export const dbPassword = process.env.DB_PASSWORD;

export const sequelizeOptions = {
  host: process.env.DB_HOST,
  dialect: process.env.DB_DIALECT
};
export const sequelizeSqLiteOptions = {
  dialect: process.env.DB_DIALECT,
  storage: process.env.DB_SQLite_PATH
};
