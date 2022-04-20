import mysql from "mysql";
import dotenv from "dotenv";

dotenv.config();

const config = {
  host: "localhost",
  user: "root",
  password: "",
  database: "upsl-msg",
  port: 3306,
};
/*const config = {
  host: "db5007311315.hosting-data.io",
  user: "dbu2827640",
  database: "dbs6023825",
  password: "vaSzof-3cekco-giwsoj",
  port: 3306,
};*/
const pool = mysql.createPool(config);

export { pool };
