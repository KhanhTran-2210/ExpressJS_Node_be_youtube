import { Sequelize } from "sequelize";
import dbConfig from "../config/db.config.js";

let { dbHost, dbUser, dbPass, dbPort, dbDialect, dbName } = dbConfig;

const sequelize = new Sequelize(dbName, dbUser, dbPass, {
  host: dbHost,
  port: dbPort,
  dialect: dbDialect,
});
// try {
//   await sequelize.authenticate(); //xác mình connect tới db thành công chưa
//   console.log("Pass");
// } catch (error) {
//   console.log("Fail");
// }

export default sequelize;
